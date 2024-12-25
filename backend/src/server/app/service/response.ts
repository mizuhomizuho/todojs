import {IError, IResultData} from "../../../../types";
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

        public sendResultCreate(data: IResultData<any>) {
            App.context.res.status(201).send({
                'status': 'success',
                'message': 'Created successfully',
                'data': data
            });
        }

    }
}