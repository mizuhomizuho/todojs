import {ServiceResponse} from "../service/response";
import {RepositoryUser} from "../repository/user";
import {IAuthenticate, IError} from "../../../../types";
import {ValidationTodo} from "../validation/todo";

export namespace ControllerTodo {

    export class Main {

        public async add() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationTodo.Main();

            const resultValidation = validation.add();
            if (!resultValidation.success) {
                serviceResponse.sendResultError(resultValidation.data as IError[]);
                return;
            }

            const serviceUser = new RepositoryUser.Main();
            const resultUserCreate = await serviceUser.create();
            if (!resultUserCreate.success) {
                serviceResponse.sendResultError(resultUserCreate.data as IError[]);
                return;
            }

            serviceResponse.sendResultSuccess(resultUserCreate.data as IAuthenticate);
        }
    }
}