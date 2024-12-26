import {IError, IItem, IResult, IStringObjectTree} from "../../../../types";
import {App} from "../app";

export namespace ServiceResponse {

    export class Main {

        public sendError(errors: IError[]) {
            App.context.res.status(400).send({
                'status': 'error',
                'message': 'Invalid data.',
                'errors': errors
            });
        }

        public sendSuccess(data: IStringObjectTree | undefined = undefined) {
            App.context.res.status(200).send({
                'status': 'success',
                'message': 'Successfully',
                'data': data
            });
        }

        public sendNotFound() {
            App.context.res.status(404).send({
                'status': 'error',
                'message': 'Not found.',
            });
        }

        public getResult(
            errors: IError[] | [] = [],
            data: any = undefined,
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