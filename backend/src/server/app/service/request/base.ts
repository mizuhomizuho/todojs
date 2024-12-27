import {App} from "../../app";
import {ServiceResponse} from "../response";
import {ServiceAuthenticate} from "../authenticate";

export namespace ServiceRequestBase {

    export class Main {

        public getUserJWT(): string {
            return this.getValue('userJWT').toString();
        }

        public getUserId() {
            const serviceAuthenticate = new ServiceAuthenticate.Main();
            const decodeJWT = serviceAuthenticate.decodeJWT(this.getUserJWT());
            if (decodeJWT) {
                return +decodeJWT.payload.id;
            }
            this.sendError();
            throw new Error('Invalid data.');
        }

        protected getValue(field: string) {
            if (typeof App.context.req.body[field] !== 'undefined') {
                return App.context.req.body[field];
            }
            this.sendError();
            throw new Error('Invalid data.');
        }

        protected sendError() {
            const response = new ServiceResponse.Main();
            response.sendError([]);
        }
    }
}