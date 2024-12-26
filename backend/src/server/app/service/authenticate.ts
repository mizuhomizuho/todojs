import jwt, {JwtPayload} from 'jsonwebtoken';
import {App} from "../app";
import {IAuthenticate, IError, IResult} from "../../../../types";
import bcrypt from "bcryptjs";
import {ServiceResponse} from "./response";

export namespace ServiceAuthenticate {

    export class Main {

        public async verifyAuthenticate(): Promise<IResult<IError[] | IAuthenticate>> {

            const prisma = App.context.prisma;

            const username = App.context.req.body.username.trim();
            const password: string = App.context.req.body.password.trim();

            const user = await prisma.user.findUnique({
                where: {
                    username: username,
                },
                select: {
                    id: true,
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

            const payload = {id: user.id.toString()};
            const serviceAuthenticate = new ServiceAuthenticate.Main();
            return serviceResponse.getResult([], {
                payload,
                token: await serviceAuthenticate.generateToken(payload),
            });
        }

        public async generateToken(payload: {}): Promise<string> {
            return new Promise((resolve, reject) => {
                jwt.sign(payload, process.env.JWT_SECRET!, {}, (err, token) => {
                    if (err) reject(err);
                    resolve(token ?? '');
                });
            });
        }

        public async isAuth(): Promise<boolean> {
            console.log(11);
            if (typeof App.context.req.body.userJWT !== 'string') {
                return false;
            }
            console.log(22);
            let userJWTDecode: IAuthenticate | null = null;
            try {
                userJWTDecode = JSON.parse(App.context.req.body.userJWT);
            } catch (e) {
            }
            console.log(333, userJWTDecode);
            if (
                !userJWTDecode
                || !(
                    typeof userJWTDecode?.payload?.id === 'string'
                    && typeof userJWTDecode?.token === 'string'
                )
            ) {
                return false;
            }
            console.log(444);
            const decodedToken = await this.decodeToken(userJWTDecode.token);
            if (decodedToken === false || decodedToken.id !== userJWTDecode.payload.id) {
                return false;
            }
            console.log(555);
            return true;
        }

        private async decodeToken(token: string): Promise<JwtPayload | false> {
            return new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
                    if (err) reject(err);
                    else resolve(typeof decoded === 'object' ? decoded : false);
                });
            });
        }
    }
}