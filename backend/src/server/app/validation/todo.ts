import {ValidationBase} from "./base";
import {App} from "../app";
import {RepositoryTodo} from "../repository/todo";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export namespace ValidationTodo {

    export class Main extends ValidationBase.Main {

        constructor() {
            super();
        }

        public async validateItem() {
            this.errors = [];
            if (!await this.validateAuth()) {
                return this.getResult();
            }
            this.validateNoEmptyString('title', 'Title cannot be empty.');
            this.validateString('description', 'Description format error.');
            this.validateString('comments', 'Comments format error.');
            this.validateStatus();
            this.validateDeadline();
            return this.getResult();
        }

        public async validateId() {
            this.errors = [];
            if (!await this.validateAuth()) {
                return this.getResult();
            }
            this.validateNumericString('id', 'Id format error.');
            return this.getResult();
        }

        private validateDeadline() {
            if (!this.validateNumericString('deadline', 'Deadline format error.')) {
                return false;
            }
            dayjs.extend(utc);
            if (+App.context.req.body.deadline < dayjs().utc().unix()) {
                this.errors.push({field: 'deadline', message: 'You cannot create tasks for past time.'});
                return false;
            }
            return true;
        }

        private validateStatus() {
            const repository = new RepositoryTodo.Main();
            if (
                typeof App.context.req.body.status !== 'string'
                || !Object.values(repository.TODO_STATUS).includes(App.context.req.body.status)
            ) {
                this.errors.push({field: 'status', message: 'Status format error.'});
                return false;
            }
            return true;
        }
    }
}