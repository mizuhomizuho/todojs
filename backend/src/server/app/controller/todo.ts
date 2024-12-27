import {ServiceResponse} from "../service/response";
import {IError, IStringObjectTree} from "../../../../types";
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

            serviceResponse.sendSuccess(resultCreate.data as unknown as IStringObjectTree);
        }

        public async delete() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationTodo.Main();

            const resultValidation = await validation.validateControllerDelete();
            if (!resultValidation.success) {
                serviceResponse.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryTodo.Main();
            const result = await repository.delete();

            if (!result.success) {
                serviceResponse.sendError(result.data as IError[]);
                return;
            }

            serviceResponse.sendSuccess(result.data as unknown as IStringObjectTree);
        }

        public async list() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationTodo.Main();

            const resultValidation = await validation.validateControllerList();
            if (!resultValidation.success) {
                serviceResponse.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryTodo.Main();
            const result = await repository.list();

            serviceResponse.sendSuccess(result.data as unknown as IStringObjectTree);
        }

        public async edit() {

            const serviceResponse = new ServiceResponse.Main();
            const validation = new ValidationTodo.Main();

            const resultValidation = await validation.validateControllerEdit();
            if (!resultValidation.success) {
                serviceResponse.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryTodo.Main();
            const result = await repository.update();

            if (!result.success) {
                serviceResponse.sendError(result.data as IError[]);
                return;
            }

            serviceResponse.sendSuccess(result.data as unknown as IStringObjectTree);
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

            if (result.success) {
                serviceResponse.sendSuccess(result.data as unknown as IStringObjectTree);
                return;
            }

            serviceResponse.sendNotFound();
        }
    }
}