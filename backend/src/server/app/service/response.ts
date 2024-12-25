import {IError, IItemBase, IItemCommon, IResult} from "../../../../types";
import {App} from "../app";

export namespace ServiceResponse {

    export class Main {

        public sendResultError(errors: IError[]) {
            App.context.res.status(400).send({
                'status': 'error',
                'message': 'Invalid data.',
                'errors': errors
            });
        }

        public sendResultSuccess(data: IItemCommon) {
            App.context.res.status(200).send({
                'status': 'success',
                'message': 'Successfully',
                'data': data
            });
        }

        public getResult(
            errors: IError[] | [] = [],
            data: any = undefined
        ): IResult<IError[] | any> {
            if (errors.length) {
                return {
                    success: false,
                    data: errors,
                };
            }
            let result = {
                success: true,
            };
            if (data !== undefined) {
                result = {...result, ...{data}};
            }
            return result;
        }
    }
}