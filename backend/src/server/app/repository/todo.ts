import {PrismaClient, Todo} from '@prisma/client';
import {IError, IStringObject, IResult, ITodoItem, IStringObjectTree} from "../../../../types";
import {App} from "../app";

export namespace RepositoryTodo {

    export class Main {

        public readonly TODO_STATUS = {
            WAITING: 'WAITING',
            IN_PROGRESS: 'IN_PROGRESS',
            DONE: 'DONE',
        };

        public async create(): Promise<IResult<{ newItem: ITodoItem }>> {

            const title = App.context.req.body.title.trim();
            const description = App.context.req.body.description.trim();
            const comments = App.context.req.body.comments.trim();
            const status = App.context.req.body.status.trim();
            const deadline = App.context.req.body.deadline.trim();

            const userJWTDecode = JSON.parse(App.context.req.body.userJWT);

            const prisma = App.context.prisma;

            const newItem = await prisma.todo.create({
                data: {
                    title,
                    description,
                    comments,
                    status,
                    deadline: new Date(+deadline * 1000),
                    userId: +userJWTDecode.payload.id,
                },
            });
            return {
                success: true,
                data: {
                    newItem: this.convertItemToStringObject(newItem),
                },
            };
        }

        private convertItemToStringObject(item: Todo): ITodoItem {
            return {
                ...item,
                ...{
                    id: item.id.toString(),
                    deadline: Math.floor(item.deadline.getTime() / 1000).toString(),
                    userId: item.userId.toString(),
                }
            };
        }

        public async update(): Promise<boolean> {

            const id = +App.context.req.body.id;

            const prisma = App.context.prisma;

            return false;
        }

        public async get(): Promise<IResult<{ item: ITodoItem } | undefined>> {

            const id = +App.context.req.body.id;

            const prisma = App.context.prisma;

            const userJWTDecode = JSON.parse(App.context.req.body.userJWT);

            const item = await prisma.todo.findUnique({
                where: {
                    id,
                    userId: +userJWTDecode.payload.id,
                },
            });

            if (!item) {
                return {
                    success: false,
                };
            }

            return {
                success: true,
                data: {
                    item: this.convertItemToStringObject(item),
                },
            };
        }
    }
}