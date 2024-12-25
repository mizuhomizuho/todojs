import {IError, IItemCommon, IResult} from "../../../../types";
import {App} from "../app";

export namespace ServiceResponse {

    export class Main {

        public sendResultError(errors: IError[]) {
            App.context.res.status(400).send({
                'status': 'error',
                'message': 'Invalid data.',
                'errors': errors
            });
        }

        public sendResultCreate(data: IItemCommon) {
            App.context.res.status(201).send({
                'status': 'success',
                'message': 'Created successfully',
                'data': data
            });
        }

        public getResult(errors: IError[] | [] = []): IResult<IError[] | undefined> {
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