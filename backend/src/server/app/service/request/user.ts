import {ServiceRequestBase} from "./base";

export namespace ServiceRequestUser {

    export class Main extends ServiceRequestBase.Main {

        public get(field: string): string {
            return this.getValue(field).toString().trim();
        }
    }
}