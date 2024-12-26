import {ServiceResponse} from "../service/response";
import {ValidationUser} from "../validation/user";
import {RepositoryUser} from "../repository/user";
import {IError, IResult, IAuthenticate, IStringObjectTree} from "../../../../types";
import {ServiceAuthenticate} from "../service/authenticate";

export namespace ControllerUser {

    export class Main {

        public async register() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationUser.Main();

            const resultValidation = validation.validateControllerRegister();
            if (!resultValidation.success) {
                serviceResponse.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryUser.Main();
            const resultCreate = await repository.create();
            if (!resultCreate.success) {
                serviceResponse.sendError(resultCreate.data as IError[]);
                return;
            }

            serviceResponse.sendSuccess({authenticate: {...resultCreate.data}} as IStringObjectTree);
        }

        public async authenticate() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationUser.Main();

            const resultValidation = validation.validateControllerAuthenticate();
            if (!resultValidation.success) {
                serviceResponse.sendError(resultValidation.data as IError[]);
                return;
            }

            const serviceAuthenticate = new ServiceAuthenticate.Main();
            const resultVerify = await serviceAuthenticate.verifyAuthenticate();
            if (!resultVerify.success) {
                serviceResponse.sendError(resultVerify.data as IError[]);
                return;
            }

            serviceResponse.sendSuccess({authenticate: {...resultVerify.data}} as IStringObjectTree);
        }
    }
}