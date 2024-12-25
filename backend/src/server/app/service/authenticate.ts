import jwt, {JwtPayload} from 'jsonwebtoken';
import {PrismaClient} from "@prisma/client";
import {App} from "../app";
import {IError, IResult, IAuthenticate} from "../../../../types";
import bcrypt from "bcryptjs";
import {ServiceResponse} from "./response";

export namespace ServiceAuthenticate {

    export class Main {

        public async verifyAuthenticate(): Promise<IResult<IError[] | IAuthenticate>> {

            const prisma = new PrismaClient();

            const username = App.context.req.body.username.trim();
            const password: string = App.context.req.body.password.trim();

            const user = await prisma.user.findUnique({
                where: {
                    username: username,
                },
                select: {
                    password: true,
                },
            });

            const error = {message: 'Failed to authenticate.'}
            const serviceResponse = new ServiceResponse.Main();

            if (user === null) {
                return serviceResponse.getResult([error]);
            }

            const compareResult: boolean = await new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, function (err, res) {
                    if (err) reject(err);
                    resolve(res);
                });
            });

            if (!compareResult) {
                return serviceResponse.getResult([error]);
            }

            const payload = {username};
            const serviceAuthenticate = new ServiceAuthenticate.Main();
            return serviceResponse.getResult([], {
                payload,
                token: await serviceAuthenticate.generateToken(payload),
            });
            // as IResult<IAuthenticate>
        }

        public async generateToken(payload: {}): Promise<string> {
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
    }
}