import {ServiceResponse} from "../service/response";
import {ValidationUser} from "../validation/user";
import {RepositoryUser} from "../repository/user";
import {IError, IStringObjectTree} from "../../../../types";
import {ServiceAuthenticate} from "../service/authenticate";
import {ServiceRequestUser} from "../service/request/user";

export namespace ControllerUser {

    export class Main {

        public async register() {

            const response = new ServiceResponse.Main();
            const request = new ServiceRequestUser.Main();
            const validation = new ValidationUser.Main({
                'username': request.get('username'),
                'password': request.get('password'),
                'password2': request.get('password2'),
            });

            const resultValidation = validation.validateControllerRegister();
            if (!resultValidation.success) {
                response.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryUser.Main();
            const resultCreate = await repository.create(
                request.get('username'),
                request.get('password'),
            );
            if (!resultCreate.success) {
                response.sendError(resultCreate.data as IError[]);
                return;
            }

            response.sendSuccess({authenticate: {...resultCreate.data}} as IStringObjectTree);
        }

        public async authenticate() {

            const response = new ServiceResponse.Main();
            const request = new ServiceRequestUser.Main();
            const validation = new ValidationUser.Main({
                'username': request.get('username'),
                'password': request.get('password'),
            });

            const resultValidation = validation.validateControllerAuthenticate();
            if (!resultValidation.success) {
                response.sendError(resultValidation.data as IError[]);
                return;
            }

            const serviceAuthenticate = new ServiceAuthenticate.Main();
            const resultVerify = await serviceAuthenticate.verifyAuthenticate(
                request.get('username'),
                request.get('password'),
            );
            if (!resultVerify.success) {
                response.sendError(resultVerify.data as IError[]);
                return;
            }

            response.sendSuccess({authenticate: {...resultVerify.data}} as IStringObjectTree);
        }
    }
}