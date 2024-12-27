import {App} from "../../app";
import {ICommonObject} from "../../../../../types";

export namespace ServiceRequestBase {

    export class Main {

        private _data: ICommonObject;

        constructor(data: ICommonObject) {
            this._data = data;
        }

        public getUserJWT(): string {
            if (typeof App.context.req.body.userJWT !== 'string') {
                return '';
            }
            return App.context.req.body.userJWT;
        }

        get data(): ICommonObject {
            return this._data;
        }

        set data(value: ICommonObject) {
            this._data = value;
        }
    }
}