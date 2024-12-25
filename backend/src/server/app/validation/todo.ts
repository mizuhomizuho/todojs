import {ValidationBase} from "./base";
import {App} from "../app";
import {RepositoryTodo} from "../repository/todo";

export namespace ValidationTodo {

    export class Main extends ValidationBase.Main {

        constructor() {
            super();
        }

        public add() {
            this.errors = [];
            this.validateTitle();
            this.validateString('description', 'Description format error.');
            this.validateString('comments', 'Comments format error.');
            this.validateStatus();
            this.validateDeadline();
            return this.getResult();
        }

        private validateDeadline() {
            if (
                typeof App.context.req.body.deadline !== 'string'
                || !/^\d+$/.test(App.context.req.body.deadline)
            ) {
                this.errors.push({field: 'deadline', message: 'Deadline format error.'});
                return;
            }
            const unixTimestamp = Math.floor(Date.now() / 1000);
            if (+App.context.req.body.deadline < unixTimestamp) {
                this.errors.push({field: 'deadline', message: 'You cannot create tasks for past time.'});
            }
        }

        private validateTitle() {
            if (
                typeof App.context.req.body.title !== 'string'
                || App.context.req.body.title.trim() === ''
            ) {
                this.errors.push({field: 'title', message: 'Title cannot be empty.'});
            }
        }

        private validateString(field: string, message: string) {
            if (typeof App.context.req.body[message] !== 'string') {
                this.errors.push({field, message});
            }
        }

        private validateStatus() {
            if (
                typeof App.context.req.body.status !== 'string'
                || !Object.values(RepositoryTodo.Main.TODO_STATUS).includes(App.context.req.body.status)
            ) {
                this.errors.push({field: 'status', message: 'Status format error.'});
            }
        }
    }
}