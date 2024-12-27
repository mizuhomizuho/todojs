import {ValidationBase} from "./base";
import {RepositoryTodo} from "../repository/todo";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {ICommonObject} from "../../../../types";

export namespace ValidationTodo {

    export class Main extends ValidationBase.Main {

        private _validateData: ICommonObject;
        private _userJWT: string;

        constructor(validateData: ICommonObject, userJWT: string) {
            super(validateData);
            this._validateData = validateData;
            this._userJWT = userJWT;
        }

        public async validateControllerDelete() {
            this.errors = [];
            if (!await this.validateAuth(this.userJWT)) {
                return this.getResult();
            }
            this.validateNumericString('id', 'Id format error.');
            return this.getResult();
        }

        public async validateControllerEdit() {
            this.errors = [];
            if (!await this.validateAuth(this.userJWT)) {
                return this.getResult();
            }
            this.validateNumericString('id', 'Id format error.');
            await this.validateFields();
            return this.getResult();
        }

        public async validateControllerList() {
            this.errors = [];
            if (!await this.validateAuth(this.userJWT)) {
                return this.getResult();
            }
            return this.getResult();
        }

        public async validateControllerAdd() {
            this.errors = [];
            if (!await this.validateAuth(this.userJWT)) {
                return this.getResult();
            }
            await this.validateFields();
            return this.getResult();
        }

        private async validateFields() {
            this.validateNoEmptyString('title', 'Title cannot be empty.');
            this.validateString('description', 'Description format error.');
            this.validateString('comments', 'Comments format error.');
            this.validateStatus();
            this.validateDeadline();
        }

        public async validateControllerGet() {
            this.errors = [];
            if (!await this.validateAuth(this.userJWT)) {
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
            if (
                typeof this.validateData.id === 'undefined'
                && +this.validateData.deadline < dayjs().utc().unix()
            ) {
                this.errors.push({field: 'deadline', message: 'You cannot create tasks for past time.'});
                return false;
            }
            return true;
        }

        private validateStatus() {
            const repository = new RepositoryTodo.Main();
            if (
                typeof this.validateData.status !== 'string'
                || !Object.values(repository.TODO_STATUS).includes(this.validateData.status)
            ) {
                this.errors.push({field: 'status', message: 'Status format error.'});
                return false;
            }
            return true;
        }

        private get validateData(): ICommonObject {
            return this._validateData;
        }

        private set validateData(value: ICommonObject) {
            this._validateData = value;
        }

        private get userJWT(): string {
            return this._userJWT;
        }

        private set userJWT(value: string) {
            this._userJWT = value;
        }
    }
}