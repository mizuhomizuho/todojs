import {ServiceResponse} from "../service/response";
import {ServiceValidationUser} from "../service/validation/user";
import {ServiceUser} from "../service/user";
import {IError, IUserCreateResult} from "../../../../types";

export namespace ControllerUser {

    export class Main {

        public async register() {

            const serviceResponse = new ServiceResponse.Main();
            const serviceValidationUser = new ServiceValidationUser.Main();

            const resultValidationUser = serviceValidationUser.register();
            if (!resultValidationUser.success) {
                serviceResponse.sendResultError(resultValidationUser.data as IError[]);
                return;
            }

            const serviceUser = new ServiceUser.Main();
            const resultUserCreate = await serviceUser.create();
            if (!resultUserCreate.success) {
                serviceResponse.sendResultError(resultUserCreate.data as IError[]);
                return;
            }

            serviceResponse.sendResultCreate(resultUserCreate.data as IUserCreateResult);
        }
    }
}