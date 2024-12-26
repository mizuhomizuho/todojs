import {Request, Response} from 'express';
import {App} from "../app";
import {ServiceContext} from "./context";
import {PrismaClient} from "@prisma/client";

export namespace ServiceRouter {

    export class Main {

        public static async init(controller: any, method: string, req: Request, res: Response) {
            const prisma = new PrismaClient();
            try {
                App.context = new ServiceContext.Main(req, res, prisma);
                const controllerInstance = new controller();
                await controllerInstance[method]();
            } catch (error) {
                console.error('Error:', error);
            } finally {
                await prisma.$disconnect();
            }
        }
    }
}