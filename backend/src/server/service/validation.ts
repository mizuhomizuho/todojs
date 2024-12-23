import {Request} from "express";

export namespace TodojsServiceValidation {

    export class Main {

        private _req: Request;

        constructor(req: Request) {
            this._req = req;
        }

        public register() {
            const errors: {}[] = [];
            if (typeof this.req.body.username !== 'string' || this.req.body.username.trim() === '') {
                errors.push({username: 'Username cannot be empty.'});
            }
            if (typeof this.req.body.password !== 'string' || this.req.body.password.trim() === '') {
                errors.push({password: 'Password cannot be empty.'});
            }
            if (typeof this.req.body.password2 !== 'string' || this.req.body.password !== this.req.body.password2) {
                errors.push({password2: 'Passwords do not match.'});
            }
            if (errors.length) {
                return errors;
            }
            return true;
        }

        private get req(): Request {
            return this._req;
        }

        private set req(value: Request) {
            this._req = value;
        }
    }
}