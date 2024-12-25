import {Prisma, PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import {IError, IResult, IUserCreateResult} from "../../../../types";
import {ServiceAuthenticate} from "./authenticate";
import {App} from "../app";

export namespace ServiceUser {

    export class Main {

        public async create(): Promise<IResult<IError[] | IUserCreateResult>> {
            try {
                const salt = await bcrypt.genSalt(8);
                const hash = await bcrypt.hash(App.context.req.body.password, salt);

                const prisma = new PrismaClient();

                const newUser = await prisma.user.create({
                    data: {
                        username: App.context.req.body.username,
                        password: hash,
                    },
                });
                const payload = {username: newUser.username};
                const serviceAuthenticate = new ServiceAuthenticate.Main();
                return {
                    success: true,
                    data: {
                        payload,
                        token: await serviceAuthenticate.generateToken(payload),
                    },
                };
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                    return {
                        success: false,
                        data: [{field: 'username', message: 'Username is invalid.'}],
                    };
                }
                console.log(error);
                return {
                    success: false,
                    data: [{message: 'Cant create a new user.'}],
                };
            }
        }
    }
}