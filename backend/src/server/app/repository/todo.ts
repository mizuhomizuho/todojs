import {Prisma, Todo} from '@prisma/client';
import {IError, IResult, ITodoItem} from "../../../../types";
import {App} from "../app";

export namespace RepositoryTodo {

    export class Main {

        public readonly TODO_STATUS = {
            WAITING: 'WAITING',
            IN_PROGRESS: 'IN_PROGRESS',
            DONE: 'DONE',
        };

        public async list(userId: number): Promise<IResult<{ list: ITodoItem[] }>> {
            const items: Todo[] = await App.context.prisma.todo.findMany({
                where: {userId},
            });
            return {
                success: true,
                data: {list: items.map((item: Todo) => this.convertPrismaTodoToITodoItem(item))},
            };
        }

        public async create(item: Todo): Promise<IResult<{ newItem: ITodoItem }>> {
            const {id, ...data} = item;
            const newItem = await App.context.prisma.todo.create({data: data});
            return {success: true, data: {newItem: this.convertPrismaTodoToITodoItem(newItem)}};
        }

        private convertPrismaTodoToITodoItem(item: Todo): ITodoItem {
            return {
                ...item,
                id: item.id.toString(),
                deadline: Math.floor(item.deadline.getTime() / 1000).toString(),
                userId: item.userId.toString(),
            };
        }

        public async delete(id: number, userId: number): Promise<IResult<{ item: ITodoItem } | IError[]>> {
            const notExist = {success: false, data: [{message: 'Record to delete does not exist.'}]};
            try {
                const resultGet = await this.get(id, userId);
                if (!resultGet.success || typeof resultGet?.data?.item === 'undefined') {
                    return notExist;
                }
                if (resultGet.data.item.status === this.TODO_STATUS.DONE) {
                    return {
                        success: false,
                        data: [{message: 'You cannot delete an item with the status "completed".'}]
                    };
                }
                const item: Todo = await App.context.prisma.todo.delete({
                    where: {id, userId}
                });
                return {success: true, data: {item: this.convertPrismaTodoToITodoItem(item)}};
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                    return notExist;
                }
            }
            return {success: false, data: [{message: 'Cant delete.'}]};
        }

        public async update(data: Todo): Promise<IResult<{ item: ITodoItem } | IError[]>> {
            try {
                const item: Todo = await App.context.prisma.todo.update({
                    where: {id: data.id, userId: data.userId}, data: data,
                });
                return {success: true, data: {item: this.convertPrismaTodoToITodoItem(item)}};
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                    return {success: false, data: [{message: 'Record to update not found.'}]};
                }
            }
            return {success: false, data: [{message: 'Cant update.'}]};
        }

        public async get(id: number, userId: number): Promise<IResult<{ item: ITodoItem } | undefined>> {
            const item = await App.context.prisma.todo.findUnique({
                where: {id, userId},
            });
            if (!item) {
                return {success: false};
            }
            return {
                success: true,
                data: {item: this.convertPrismaTodoToITodoItem(item)},
            };
        }
    }
}