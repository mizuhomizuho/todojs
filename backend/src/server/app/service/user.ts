import {Request} from 'express';
import {Prisma, PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {IError, IResult, IUserCreateResult} from "../types";

export namespace TodojsServiceUser {

    export class Main {

        private _req: Request;

        constructor(req: Request) {
            this._req = req;
        }

        private async generateToken(payload: {}): Promise<string> {
            return new Promise((resolve, reject) => {
                jwt.sign(payload, process.env.JWT_SECRET!, {}, (err, token) => {
                    if (err) reject(err);
                    resolve(token ?? '');
                });
            });
        }

        private async verifyToken(token: string): Promise<JwtPayload | false> {
            return new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
                    if (err) reject(err);
                    else resolve(typeof decoded === 'object' ? decoded : false);
                });
            });
        }

        public async create(): Promise<IResult<IError[] | IUserCreateResult>> {

            const salt = await bcrypt.genSalt(8);
            const hash = await bcrypt.hash(this.req.body.password, salt);

            const prisma = new PrismaClient();

            try {
                const newUser = await prisma.user.create({
                    data: {
                        username: this.req.body.username,
                        password: hash,
                    },
                });
                const payload = {username: newUser.username};
                return {
                    success: true,
                    data: {
                        data: payload,
                        token: await this.generateToken(payload),
                    },
                };
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                    return {
                        success: true,
                        data: [{field: 'username', message: 'Username cannot be empty.'}],
                    };
                }
                throw error;
                // console.log(111, e, 112, JSON.stringify(e), 113);
            }


            // const newUser = await prisma.user.create({
            //     data: {
            //         username: this.req.body.username,
            //         password: hash,
            //     },
            // });

            // console.log(newUser);
            // return ;


        }

        private get req(): Request {
            return this._req;
        }

        private set req(value: Request) {
            this._req = value;
        }
    }
}