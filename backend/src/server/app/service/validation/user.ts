import {IError, IResult} from "../../../../../types";
import {App} from "../../app";
import {ServiceResponse} from "../response";

export namespace ServiceValidationUser {

    export class Main {

        private _errors: IError[];

        constructor() {
            this._errors = [];
        }

        public register() {
            this.errors = [];
            this.validateUsername();
            this.validatePassword();
            this.validatePassword2();
            return this.getResult();
        }

        public authenticate() {
            this.errors = [];
            this.validateUsername();
            this.validatePassword();
            return this.getResult();
        }

        private validatePassword2() {
            if (
                typeof App.context.req.body.password2 !== 'string'
                || App.context.req.body.password !== App.context.req.body.password2
            ) {
                this.errors.push({field: 'password2', message: 'Passwords do not match.'});
            }
        }

        private validateUsername() {
            if (
                typeof App.context.req.body.username !== 'string'
                || App.context.req.body.username.trim() === ''
            ) {
                this.errors.push({field: 'username', message: 'Username cannot be empty.'});
            }
        }

        private validatePassword() {
            if (
                typeof App.context.req.body.password !== 'string'
                || App.context.req.body.password.trim() === ''
            ) {
                this.errors.push({field: 'password', message: 'Password cannot be empty.'});
            }
        }

        private getResult(): IResult<IError[] | undefined> {
            const serviceResponse = new ServiceResponse.Main();
            return serviceResponse.getResult(this.errors);
        }

        private get errors(): IError[] {
            return this._errors;
        }

        private set errors(value: IError[]) {
            this._errors = value;
        }
    }
}