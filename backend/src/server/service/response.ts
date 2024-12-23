import {Response} from "express";

export namespace TodojsServiceResponse {

    export class Main {

        private _res: Response;

        constructor(res: Response) {
            this._res = res;
        }

        public sendError(errors: {}[]) {
            this.res.status(400).send({
                'status': 'error',
                'message': 'Invalid request data.',
                'errors': errors
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