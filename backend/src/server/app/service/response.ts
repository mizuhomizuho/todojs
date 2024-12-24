import {Response} from 'express';
import {IError, IResultData} from "../../../../types";

export namespace TodojsServiceResponse {

    export class Main {

        private _res: Response;

        constructor(res: Response) {
            this._res = res;
        }

        public sendError(errors: IError[]) {
            this.res.status(400).send({
                'status': 'error',
                'message': 'Invalid data.',
                'errors': errors
            });
        }

        public sendResultCreate(data: IResultData<any>) {
            this.res.status(201).send({
                'status': 'success',
                'message': 'Created successfully',
                'data': data
            });
        }

        private get res(): Response {
            return this._res;
        }

        private set res(value: Response) {
            this._res = value;
        }
    }
}