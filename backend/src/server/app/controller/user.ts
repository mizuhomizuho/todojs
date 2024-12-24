import {Request, Response} from "express";
import {TodojsServiceResponse} from "../service/response";
import {TodojsServiceValidation} from "../service/validation";
import {TodojsServiceUser} from "../service/user";

import {IError, IResult, IUserCreateResult} from "../../../../../types";

export namespace TodojsControllerUser {

    export class Main {

        private _req: Request;
        private _res: Response;

        constructor(req: Request, res: Response) {
            this._req = req;
            this._res = res;
        }

        public async register() {

            const serviceResponse = new TodojsServiceResponse.Main(this.res);
            const serviceValidation = new TodojsServiceValidation.Main(this.req);

            const resultValidation = serviceValidation.register();
            if (!resultValidation.success) {
                serviceResponse.sendError(resultValidation.data as IError[]);
                return;
            }

            const serviceUser = new TodojsServiceUser.Main(this.req);
            const resultUserCreate = await serviceUser.create();
            if (!resultUserCreate.success) {
                serviceResponse.sendError(resultUserCreate.data as IError[]);
                return;
            }

            serviceResponse.sendResultCreate(resultUserCreate.data as IUserCreateResult);

            this.res.send('4');
            return;


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