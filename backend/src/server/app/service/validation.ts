import {Request} from "express";

import {IError, IResult} from "../../../../../types";

export namespace TodojsServiceValidation {

    export class Main {

        private _req: Request;

        constructor(req: Request) {
            this._req = req;
        }

        public register(): IResult<IError[]> {
            const errors: IError[] = [];
            if (typeof this.req.body.username !== 'string' || this.req.body.username.trim() === '') {
                errors.push({field: 'password', message: 'Username cannot be empty.'});
            }
            if (typeof this.req.body.password !== 'string' || this.req.body.password.trim() === '') {
                errors.push({field: 'password', message: 'Password cannot be empty.'});
            }
            if (typeof this.req.body.password2 !== 'string' || this.req.body.password !== this.req.body.password2) {
                errors.push({field: 'password2', message: 'Passwords do not match.'});
            }
            if (errors.length) {
                return {
                    success: false,
                    data: errors,
                };
            }
            return {
                success: true,
            };
        }

        private get req(): Request {
            return this._req;
        }

        private set req(value: Request) {
            this._req = value;
        }
    }
}