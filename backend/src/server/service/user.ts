import {Request} from "express";
import {PrismaClient} from '@prisma/client';

export namespace TodojsServiceUser {

    export class Main {

        private _req: Request;

        constructor(req: Request) {
            this._req = req;
        }

        public async create() {
            const prisma = new PrismaClient();
            // var jwt = require('jsonwebtoken');
            // var token = jwt.sign({ username: this.req.body.username }, process.env.JWT_SECRET);



            const newUser = await prisma.user.create({
                data: {
                    username: this.req.body.username,
                    password: this.req.body.password,
                },
            });
        }

        private get req(): Request {
            return this._req;
        }

        private set req(value: Request) {
            this._req = value;
        }
    }
}