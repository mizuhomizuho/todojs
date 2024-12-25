import {IError, IResult} from "../../../../types";
import {App} from "../app";
import {ServiceResponse} from "../service/response";

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

        protected validateString(field: string, message: string) {
            if (typeof App.context.req.body[field] !== 'string') {
                this.errors.push({field, message});
            }
        }

        protected validateNoEmptyString(field: string, message: string) {
            if (
                typeof App.context.req.body[field] !== 'string'
                || App.context.req.body[field].trim() === ''
            ) {
                this.errors.push({field: field, message: message});
            }
        }
    }
}