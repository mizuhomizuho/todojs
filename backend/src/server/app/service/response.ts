import {appContext, IError, IResultData} from "../../../../types";

export namespace ServiceResponse {

    export class Main {

        public sendResultError(errors: IError[]) {
            appContext.service.res.status(400).send({
                'status': 'error',
                'message': 'Invalid data.',
                'errors': errors
            });
        }

        public sendResultCreate(data: IResultData<any>) {
            appContext.service.res.status(201).send({
                'status': 'success',
                'message': 'Created successfully',
                'data': data
            });
        }

    }
}