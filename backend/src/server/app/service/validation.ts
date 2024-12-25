import {IError, IResult} from "../../../../types";
import {App} from "../app";

export namespace ServiceValidationUser {

    export class Main {

        public register(): IResult<IError[]> {
            const errors: IError[] = [];
            if (
                typeof App.context.req.body.username !== 'string'
                || App.context.req.body.username.trim() === ''
            ) {
                errors.push({field: 'password', message: 'Username cannot be empty.'});
            }
            if (
                typeof App.context.body.password !== 'string'
                || App.context.req.body.password.trim() === ''
            ) {
                errors.push({field: 'password', message: 'Password cannot be empty.'});
            }
            if (
                typeof App.context.body.password2 !== 'string'
                || App.context.req.body.password !== App.context.req.body.password2
            ) {
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
    }
}