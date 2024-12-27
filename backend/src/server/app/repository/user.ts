import {Prisma} from '@prisma/client';
import bcrypt from 'bcryptjs';
import {IAuthenticate, IError, IResult} from "../../../../types";
import {ServiceAuthenticate} from "../service/authenticate";
import {App} from "../app";

export namespace RepositoryUser {

    export class Main {

        public async create(username: string, password: string): Promise<IResult<IError[] | IAuthenticate>> {
            try {
                const salt = await bcrypt.genSalt(8);
                const hash = await bcrypt.hash(password, salt);

                const newItem = await App.context.prisma.user.create({
                    data: {
                        username,
                        password: hash,
                    },
                });
                const payload = {id: newItem.id.toString()};
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
                        data: [{
                            field: 'username',
                            message: 'The username is already taken. Please try choosing another one.'
                        }],
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