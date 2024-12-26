import {PrismaClient} from "@prisma/client";
import {App} from "./app";

async function test() {

    const prisma = new PrismaClient();

    const items = await prisma.todo.delete({
        where: {id: 1}
    });

    return items;
}

async function test2() {

    console.log(await test());
}


console.log(test2());


// import {TodojsControllerUser} from "../controller/user";
// import e from "express";
//
// const req = new e;
//
// const controller = new TodojsControllerUser.Main();
// controller.register();

// ts-node /todojs/src/server/app/test.ts

// import jwt, {JwtPayload} from "jsonwebtoken";
// import {App} from "./app";
// import bcrypt from "bcryptjs";
// import {ServiceAuthenticate} from "./service/authenticate";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";

// async function test() {
//     const res = await bcryptjs.genSalt(10);
//     return res;
// }

// console.log(test());

// var bcrypt = require('bcryptjs');
// bcrypt.genSalt(10, function(err: any, salt: any) {
//     bcrypt.hash("B4c0/\/", salt, function(err: any, hash: any) {
//         console.log(hash, salt);
//     });
// });
// let hash = '$2a$10$ljaLZew.BVh8fjN5yUZ9puglxNlmcDBGHd6liZ0jGRGwLqWhcjLCu';
// bcrypt.compare("B4c0/\/", hash, function(err: any, res: any) {
//     console.log(res, 1);
// });
// hash = '$2a$10$qhcjn8DUlJvGFDZz9VPSPO4t4mUCj69eNBTuRiRAFTKWW3.NfC8j.';
// bcrypt.compare("B4c0/\/", hash, function(err: any, res: any) {
//     console.log(res, 2);
// });
// bcrypt.compare("1-B4c0/\/", hash, function(err: any, res: any) {
//     console.log(res, 3);
// });

// async function generateToken(payload: {}): Promise<string> {
//     return new Promise((resolve, reject) => {
//         jwt.sign(payload, 'xxxx', {}, (err, token) => {
//             if (err) reject(err);
//             resolve(token ?? '');
//         });
//     });
// }
//
// async function verifyToken(token: string): Promise<JwtPayload | false> {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, 'xxxx', (err, decoded) => {
//             if (err) reject(err);
//             else resolve(typeof decoded === 'object' ? decoded : false);
//         });
//     });
// }
//
// async function test() {
//
//     const prisma = new PrismaClient();
//
//     const user = await prisma.user.findUnique({
//         where: {
//             username: '123',
//         },
//         select: {
//             password: true,
//         },
//     });
//
//     // console.log(user);
//     return user;
// }
//
// async function test2() {
//     const res = await test();
//
//     const compareResult: boolean = await new Promise((resolve, reject) => {
//         bcrypt.compare('1232', res!.password, function (err, res) {
//             if (err) reject(err);
//             resolve(res);
//         });
//     });
//
//
//     console.log(compareResult);
// }
//
// console.log(test2());
