import {ServiceResponse} from "../service/response";
import {IError} from "../../../../types";
import {ValidationTodo} from "../validation/todo";
import {RepositoryTodo} from "../repository/todo";

export namespace ControllerTodo {

    export class Main {

        public async add() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationTodo.Main();

            const resultValidation = await validation.validateControllerAdd();
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

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationTodo.Main();

            const resultValidation = await validation.validateControllerEdit();
            if (!resultValidation.success) {
                serviceResponse.sendError(resultValidation.data as IError[]);
                return;
            }

            // const repository = new RepositoryTodo.Main();
            // const result = await repository.edit();
            //
            // if (typeof result.data?.item !== 'undefined') {
            //     serviceResponse.sendSuccess();
            //     return;
            // }

            serviceResponse.sendNotFound();
        }

        public async get() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationTodo.Main();

            const resultValidation = await validation.validateControllerGet();
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