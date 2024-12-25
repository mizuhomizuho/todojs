import {Prisma, PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';
import {IError, IResult, IAuthenticate, IItemTodo} from "../../../../types";
import {ServiceAuthenticate} from "../service/authenticate";
import {App} from "../app";

export namespace RepositoryTodo {

    export class Main {

        public static readonly TODO_STATUS = {
            WAITING: 'WAITING',
            IN_PROGRESS: 'IN_PROGRESS',
            DONE: 'DONE',
        };

        public async create(): Promise<IResult<IError[] | {newItem: IItemTodo}>> {

            const title = App.context.req.body.title.trim();
            const description = App.context.req.body.description.trim();
            const comments = App.context.req.body.comments.trim();
            const status = App.context.req.body.status.trim();
            const deadline = App.context.req.body.deadline.trim();

            const prisma = new PrismaClient();

            const newItem = await prisma.todo.create({
                data: {
                    title,
                    description,
                    comments,
                    status,
                    deadline: new Date(+deadline * 1000),
                },
            });
            return {
                success: true,
                data: {
                    newItem: {
                        ...newItem,
                        ...{
                            id: newItem.id + '',
                            deadline: Math.floor(newItem.deadline.getTime() / 1000) + '',
                        }
                    },
                },
            };
        }
    }
}