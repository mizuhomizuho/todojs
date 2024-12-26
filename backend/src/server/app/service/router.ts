import {Request, Response} from 'express';
import {App} from "../app";
import {ServiceContext} from "./context";

export namespace ServiceRouter {

    export class Main {

        public static async init(controller: any, method: string, req: Request, res: Response) {
            try {
                App.context = new ServiceContext.Main(req, res);
                const controllerInstance = new controller();
                await controllerInstance[method]();
            } catch (error) {
                console.error('Error:', error);
            } finally {
                await App.context.prisma.$disconnect();
            }
        }
    }
}