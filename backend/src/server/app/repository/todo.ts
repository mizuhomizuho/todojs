import {Prisma, Todo} from '@prisma/client';
import {IAuthenticate, IError, IResult, ITodoItem} from "../../../../types";
import {App} from "../app";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export namespace RepositoryTodo {

    export class Main {

        public readonly TODO_STATUS = {
            WAITING: 'WAITING',
            IN_PROGRESS: 'IN_PROGRESS',
            DONE: 'DONE',
        };

        private getData(id: number) {

            const title: string = App.context.req.body.title.trim();
            const description: string = App.context.req.body.description.trim();
            const comments: string = App.context.req.body.comments.trim();
            const status: string = App.context.req.body.status.trim();
            const deadline: string = App.context.req.body.deadline.trim();

            const userJWTDecode: IAuthenticate = JSON.parse(App.context.req.body.userJWT);

            dayjs.extend(utc);
            dayjs.extend(timezone);

            const data: Todo = {
                id,
                title,
                description,
                comments,
                status,
                deadline: new Date(dayjs.tz(+deadline * 1000, 'UTC').format()),
                userId: +userJWTDecode.payload.id,
            };

            return data;
        };

        public async list(): Promise<IResult<{ list: ITodoItem[] }>> {
            const userJWTDecode: IAuthenticate = JSON.parse(App.context.req.body.userJWT);
            const items: Todo[] = await App.context.prisma.todo.findMany({
                where: {userId: +userJWTDecode.payload.id},
            });
            return {
                success: true,
                data: {list: items.map((item: Todo) => this.convertItemToStringObject(item))},
            };
        }

        public async create(): Promise<IResult<{ newItem: ITodoItem }>> {
            const {id, ...data} = this.getData(0);
            const newItem = await App.context.prisma.todo.create({data: data});
            return {success: true, data: {newItem: this.convertItemToStringObject(newItem)}};
        }

        private convertItemToStringObject(item: Todo): ITodoItem {
            return {
                ...item,
                id: item.id.toString(),
                deadline: Math.floor(item.deadline.getTime() / 1000).toString(),
                userId: item.userId.toString(),
            };
        }

        public async delete(): Promise<IResult<{ item: ITodoItem } | IError[]>> {
            try {
                const userJWTDecode: IAuthenticate = JSON.parse(App.context.req.body.userJWT);
                const item: Todo = await App.context.prisma.todo.delete({
                    where: {id: +App.context.req.body.id, userId: +userJWTDecode.payload.id}
                });
                return {success: true, data: {item: this.convertItemToStringObject(item)}};
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                    return {success: false, data: [{message: 'Record to delete does not exist.'}]};
                }
            }
            return {success: false, data: [{message: 'Cant delete.'}]};
        }

        public async update(): Promise<IResult<{ item: ITodoItem } | IError[]>> {
            const data = this.getData(+App.context.req.body.id);
            try {
                const item: Todo = await App.context.prisma.todo.update({
                    where: {id: data.id, userId: data.userId}, data: data,
                });
                return {success: true, data: {item: this.convertItemToStringObject(item)}};
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                    return {success: false, data: [{message: 'Record to update not found.'}]};
                }
            }
            return {success: false, data: [{message: 'Cant update.'}]};
        }

        public async get(): Promise<IResult<{ item: ITodoItem } | undefined>> {
            const id = +App.context.req.body.id;
            const prisma = App.context.prisma;
            const userJWTDecode = JSON.parse(App.context.req.body.userJWT);
            const item = await prisma.todo.findUnique({
                where: {id, userId: +userJWTDecode.payload.id},
            });
            if (!item) {
                return {success: false};
            }
            return {
                success: true,
                data: {item: this.convertItemToStringObject(item)},
            };
        }
    }
}