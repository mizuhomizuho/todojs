import {appContext, IError, IResult} from "../../../../types";

export namespace ServiceValidationUser {

    export class Main {

        public register(): IResult<IError[]> {
            const errors: IError[] = [];
            if (
                typeof appContext.service.req.body.username !== 'string'
                || appContext.service.req.body.username.trim() === ''
            ) {
                errors.push({field: 'password', message: 'Username cannot be empty.'});
            }
            if (
                typeof appContext.service.body.password !== 'string'
                || appContext.service.req.body.password.trim() === ''
            ) {
                errors.push({field: 'password', message: 'Password cannot be empty.'});
            }
            if (
                typeof appContext.service.body.password2 !== 'string'
                || appContext.service.req.body.password !== appContext.service.req.body.password2
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