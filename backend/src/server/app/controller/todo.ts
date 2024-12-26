import {ServiceResponse} from "../service/response";
import {IError, IStringObject} from "../../../../types";
import {ValidationTodo} from "../validation/todo";
import {RepositoryTodo} from "../repository/todo";

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

            const repository = new RepositoryTodo.Main();
            const resultCreate = await repository.create();

            if (typeof resultCreate.data?.newItem !== 'undefined') {
                serviceResponse.sendResultSuccess(resultCreate.data);
            }
        }
    }
}