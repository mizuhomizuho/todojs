import {Request, Response} from "express";
import {TodojsServiceResponse} from "../service/response";
import {TodojsServiceValidation} from "../service/validation";
import bcryptjs from 'bcryptjs';

export namespace TodojsControllerUser {

    export class Main {

        private _req: Request;
        private _res: Response;

        constructor(req: Request, res: Response) {
            this._req = req;
            this._res = res;
        }

        public async register() {

            // const response = new TodojsServiceResponse.Main(this.res);
            // const validation = new TodojsServiceValidation.Main(this.req);
            // const resultValidation = validation.register();
            //
            // if (resultValidation !== true) {
            //     response.sendError(resultValidation);
            //     return;
            // }

            console.log(await bcryptjs.genSalt(10));


            //
            // .status(400)
            //
            //     const result = {
            //         "status": "error",
            //         "message": "Invalid request data.",
            //         "errors": {
            //             "email": "The email field is required.",
            //             "password": "The password must be at least 6 characters."
            //         }
            //     }
            //     return {
            //         body: req.body,
            //     };
        }

        private get req(): Request {
            return this._req;
        }

        private set req(value: Request) {
            this._req = value;
        }

        private get res(): Response {
            return this._res;
        }

        private set res(value: Response) {
            this._res = value;
        }
    }
}