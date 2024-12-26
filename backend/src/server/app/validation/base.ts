import {IError, IResult} from "../../../../types";
import {App} from "../app";
import {ServiceResponse} from "../service/response";
import {ServiceAuthenticate} from "../service/authenticate";

export namespace ValidationBase {

    export class Main {

        private _errors: IError[];

        constructor() {
            this._errors = [];
        }

        protected getResult(): IResult<IError[] | undefined> {
            const serviceResponse = new ServiceResponse.Main();
            return serviceResponse.getResult(this.errors);
        }

        protected get errors(): IError[] {
            return this._errors;
        }

        protected set errors(value: IError[]) {
            this._errors = value;
        }

        protected async validateAuth() {
            const serviceAuthenticate = new ServiceAuthenticate.Main();
            if (!await serviceAuthenticate.isAuth()) {
                this.errors.push({message: 'Authenticate failed.'});
                return false;
            }
            return true;
        }

        protected validateString(field: string, message: string) {
            if (typeof App.context.req.body[field] !== 'string') {
                this.errors.push({field, message});
                return false;
            }
            return true;
        }

        protected validateNoEmptyString(field: string, message: string) {
            if (
                typeof App.context.req.body[field] !== 'string'
                || App.context.req.body[field].trim() === ''
            ) {
                this.errors.push({field: field, message: message});
                return false;
            }
            return true;
        }

        protected validateNumericString(field: string, message: string) {
            if (
                typeof App.context.req.body[field] !== 'string'
                || !/^\d+$/.test(App.context.req.body[field])
            ) {
                this.errors.push({field: field, message: message});
                return false;
            }
            return true;
        }
    }
}