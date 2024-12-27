import {ICommonObject, IError, IResult} from "../../../../types";
import {ServiceResponse} from "../service/response";
import {ServiceAuthenticate} from "../service/authenticate";

export namespace ValidationBase {

    export class Main {

        private _errors: IError[];
        private _data: ICommonObject;

        constructor(data: ICommonObject) {
            this._data = data;
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

        protected async validateAuth(userJWT: string) {
            const serviceAuthenticate = new ServiceAuthenticate.Main();
            if (!await serviceAuthenticate.isAuth(userJWT)) {
                this.errors.push({message: 'Failed to authenticate.'});
                return false;
            }
            return true;
        }

        protected validateString(field: string, message: string) {
            if (typeof this.data[field] !== 'string') {
                this.errors.push({field, message});
                return false;
            }
            return true;
        }

        protected validateNoEmptyString(field: string, message: string) {
            if (
                typeof this.data[field] !== 'string'
                || this.data[field].trim() === ''
            ) {
                this.errors.push({field: field, message: message});
                return false;
            }
            return true;
        }

        public validateNumericStringBase(value: any) {
            if (
                typeof value !== 'string'
                || !/^\d+$/.test(value)
            ) {
                return false;
            }
            return true;
        }

        protected validateNumericString(field: string, message: string) {
            if (!this.validateNumericStringBase(this.data[field])) {
                this.errors.push({field: field, message: message});
                return false;
            }
            return true;
        }

        private get data(): ICommonObject {
            return this._data;
        }

        private set data(value: ICommonObject) {
            this._data = value;
        }
    }
}