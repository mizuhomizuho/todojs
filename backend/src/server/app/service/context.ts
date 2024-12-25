import {Request, Response} from 'express';

export namespace ServiceContext {

    export class Main {

        private _req: Request;
        private _res: Response;

        constructor(req: Request, res: Response) {
            this._req = req;
            this._res = res;
        }

        public get req(): Request {
            return this._req;
        }

        private set req(value: Request) {
            this._req = value;
        }

        public get res(): Response {
            return this._res;
        }

        private set res(value: Response) {
            this._res = value;
        }
    }
}