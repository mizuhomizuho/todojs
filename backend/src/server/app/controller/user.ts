import {ServiceResponse} from "../service/response";
import {ValidationUser} from "../validation/user";
import {RepositoryUser} from "../repository/user";
import {IError, IResult, IAuthenticate} from "../../../../types";
import {ServiceAuthenticate} from "../service/authenticate";

export namespace ControllerUser {

    export class Main {

        public async register() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationUser.Main();

            const resultValidation = validation.register();
            if (!resultValidation.success) {
                serviceResponse.sendResultError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryUser.Main();
            const resultCreate = await repository.create();
            if (!resultCreate.success) {
                serviceResponse.sendResultError(resultCreate.data as IError[]);
                return;
            }

            serviceResponse.sendResultSuccess(resultCreate.data as IAuthenticate);
        }

        public async authenticate() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationUser.Main();

            const resultValidation = validation.authenticate();
            if (!resultValidation.success) {
                serviceResponse.sendResultError(resultValidation.data as IError[]);
                return;
            }

            const serviceAuthenticate = new ServiceAuthenticate.Main();
            const resultVerify = await serviceAuthenticate.verifyAuthenticate();
            if (!resultVerify.success) {
                serviceResponse.sendResultError(resultVerify.data as IError[]);
                return;
            }

            serviceResponse.sendResultSuccess(resultVerify as IResult<IAuthenticate>);
        }
    }
}