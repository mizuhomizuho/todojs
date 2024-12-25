import {Prisma, PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import {IError, IResult, IAuthenticate} from "../../../../types";
import {ServiceAuthenticate} from "./authenticate";
import {App} from "../app";

export namespace ServiceUser {

    export class Main {

        public async create(): Promise<IResult<IError[] | IAuthenticate>> {
            try {
                const username = App.context.req.body.username.trim();
                const password = App.context.req.body.password.trim();

                const salt = await bcrypt.genSalt(8);

                const hash = await bcrypt.hash(password, salt);

                const prisma = new PrismaClient();

                const newUser = await prisma.user.create({
                    data: {
                        username: username,
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
                return {
                    success: false,
                    data: [{message: 'Cant create a new user.'}],
                };
            }
        }
    }
}