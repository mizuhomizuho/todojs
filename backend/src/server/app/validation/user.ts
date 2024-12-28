import {ValidationBase} from "./base";
import {ICommonObject} from "../../../../types";

export namespace ValidationUser {

    export class Main extends ValidationBase.Main {

        private readonly ERROR_USERNAME = 'Username cannot be empty.';
        private readonly ERROR_PASSWORD = 'Password cannot be empty.';

        private _validateData: ICommonObject;

        constructor(validateData: ICommonObject) {
            super(validateData);
            this._validateData = validateData;
        }

        public validateControllerRegister() {
            this.errors = [];
            this.validateNoEmptyString('username', this.ERROR_USERNAME);
            this.validateNoEmptyString('password', this.ERROR_PASSWORD);
            this.validatePassword2();
            return this.getResult();
        }

        public validateControllerAuthenticate() {
            this.errors = [];
            this.validateNoEmptyString('username', this.ERROR_USERNAME);
            this.validateNoEmptyString('password', this.ERROR_PASSWORD);
            return this.getResult();
        }

        private validatePassword2() {
            if (
                typeof this.validateData.password2 !== 'string'
                || this.validateData.password !== this.validateData.password2
            ) {
                this.errors.push({field: 'password2', message: 'Passwords do not match.'});
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
    }
}