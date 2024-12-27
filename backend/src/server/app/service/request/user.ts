import {App} from "../../app";

export namespace ServiceRequestUser {

    export class Main {

        public get(field: string): string {
            return App.context.req.body[field].trim();
        }
    }
}