import {Request, Response} from 'express';
import {PrismaClient} from "@prisma/client";

export namespace ServiceContext {

    export class Main {

        private _req: Request;
        private _res: Response;
        private _prisma: PrismaClient

        constructor(req: Request, res: Response) {
            this._req = req;
            this._res = res;
            this._prisma = new PrismaClient();
        }

        public get prisma(): PrismaClient {
            return this._prisma;
        }

        private set prisma(value: PrismaClient) {
            this._prisma = value;
        }

        public get req(): Request {
            return this._req;
        }

        private set req(value: Request) {
            this._req = value;
        }

        public get res(): Response {
            return this._res;
        }

        private set res(value: Response) {
            this._res = value;
        }
    }
}