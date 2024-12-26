import {App} from "../app";
import {ValidationBase} from "./base";

export namespace ValidationUser {

    export class Main extends ValidationBase.Main {

        private readonly ERROR_USERNAME = 'Username cannot be empty.';
        private readonly ERROR_PASSWORD = 'Password cannot be empty.';

        constructor() {
            super();
        }

        public validateRegister() {
            this.errors = [];
            this.validateNoEmptyString('username', this.ERROR_USERNAME);
            this.validateNoEmptyString('password', this.ERROR_PASSWORD);
            this.validatePassword2();
            return this.getResult();
        }

        public validateAuthenticate() {
            this.errors = [];
            this.validateNoEmptyString('username', this.ERROR_USERNAME);
            this.validateNoEmptyString('password', this.ERROR_PASSWORD);
            return this.getResult();
        }

        private validatePassword2() {
            if (
                typeof App.context.req.body.password2 !== 'string'
                || App.context.req.body.password !== App.context.req.body.password2
            ) {
                this.errors.push({field: 'password2', message: 'Passwords do not match.'});
                return false;
            }
            return true;
        }
    }
}