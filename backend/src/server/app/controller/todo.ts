import {ServiceResponse} from "../service/response";
import {IError, IStringObjectTree} from "../../../../types";
import {ValidationTodo} from "../validation/todo";
import {RepositoryTodo} from "../repository/todo";
import {ServiceRequestTodo} from "../service/request/todo";

export namespace ControllerTodo {

    export class Main {

        public async add() {

            const response = new ServiceResponse.Main();
            const request = new ServiceRequestTodo.Main();
            const validation = new ValidationTodo.Main(request.getRequest(), request.getUserJWT());

            const resultValidation = await validation.validateControllerAdd();
            if (!resultValidation.success) {
                response.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryTodo.Main();
            const resultCreate = await repository.create(request.getPrismaTodo(0));

            response.sendSuccess(resultCreate.data as unknown as IStringObjectTree);
        }

        public async delete() {

            const response = new ServiceResponse.Main();
            const request = new ServiceRequestTodo.Main();
            const validation = new ValidationTodo.Main({'id': request.getId().toString()}, request.getUserJWT());

            const resultValidation = await validation.validateControllerDelete();
            if (!resultValidation.success) {
                response.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryTodo.Main();
            const result = await repository.delete(
                request.getId(),
                request.getUserId(),
            );

            if (!result.success) {
                response.sendError(result.data as IError[]);
                return;
            }

            response.sendSuccess(result.data as unknown as IStringObjectTree);
        }

        public async list() {

            const response = new ServiceResponse.Main();
            const request = new ServiceRequestTodo.Main();
            const validation = new ValidationTodo.Main({}, request.getUserJWT());

            const resultValidation = await validation.validateControllerList();
            if (!resultValidation.success) {
                response.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryTodo.Main();
            const result = await repository.list(request.getUserId());

            response.sendSuccess(result.data as unknown as IStringObjectTree);
        }

        public async edit() {

            const response = new ServiceResponse.Main();
            const request = new ServiceRequestTodo.Main();
            const validation = new ValidationTodo.Main(
                {...request.getRequest(), ...{'id': request.getId().toString()}},
                request.getUserJWT(),
            );

            const resultValidation = await validation.validateControllerEdit();
            if (!resultValidation.success) {
                response.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryTodo.Main();
            const result = await repository.update(
                request.getPrismaTodo(request.getId())
            );

            if (!result.success) {
                response.sendError(result.data as IError[]);
                return;
            }

            response.sendSuccess(result.data as unknown as IStringObjectTree);
        }

        public async get() {

            const response = new ServiceResponse.Main();
            const request = new ServiceRequestTodo.Main();
            const validation = new ValidationTodo.Main({'id': request.getId().toString()}, request.getUserJWT());

            const resultValidation = await validation.validateControllerGet();
            if (!resultValidation.success) {
                response.sendError(resultValidation.data as IError[]);
                return;
            }

            const repository = new RepositoryTodo.Main();
            const result = await repository.get(
                request.getId(),
                request.getUserId(),
            );

            if (result.success) {
                response.sendSuccess(result.data as unknown as IStringObjectTree);
                return;
            }

            response.sendNotFound();
        }
    }
}