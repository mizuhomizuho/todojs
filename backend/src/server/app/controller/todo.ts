import {ServiceResponse} from "../service/response";
import {IError} from "../../../../types";
import {ValidationTodo} from "../validation/todo";
import {RepositoryTodo} from "../repository/todo";
import {ServiceAuthenticate} from "../service/authenticate";

export namespace ControllerTodo {

    export class Main {

        public async add() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationTodo.Main();

            const resultValidation = await validation.validateItem();
            if (!resultValidation.success) {
                serviceResponse.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryTodo.Main();
            const resultCreate = await repository.create();

            if (typeof resultCreate.data?.newItem !== 'undefined') {
                serviceResponse.sendSuccess({newItem: {...resultCreate.data.newItem}});
                return;
            }

            serviceResponse.sendError([{message: 'Error'}]);
        }

        public async edit() {

        }

        public async get() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationTodo.Main();

            const resultValidation = await validation.validateId();
            if (!resultValidation.success) {
                serviceResponse.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryTodo.Main();
            const result = await repository.get();

            if (typeof result.data?.item !== 'undefined') {
                serviceResponse.sendSuccess({item: {...result.data.item}});
                return;
            }

            serviceResponse.sendNotFound();
        }
    }
}