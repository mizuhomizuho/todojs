// import {TodojsControllerUser} from "../controller/user";
// import e from "express";
//
// const req = new e;
//
// const controller = new TodojsControllerUser.Main();
// controller.register();

// ts-node /todojs/src/server/app/test.ts

import jwt, {JwtPayload} from "jsonwebtoken";

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

async function generateToken(payload: {}): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, 'xxxx', {}, (err, token) => {
            if (err) reject(err);
            resolve(token ?? '');
        });
    });
}

async function verifyToken(token: string): Promise<JwtPayload | false> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'xxxx', (err, decoded) => {
            if (err) reject(err);
            else resolve(typeof decoded === 'object' ? decoded : false);
        });
    });
}

async function test() {
    const res = await generateToken({xxx: 1});
    console.log(res, 111);
    const res2 = await verifyToken(res);
    console.log(res2, 222);
    if (res2 !== false) {
        const date = new Date(res2.iat! * 1000);
        console.log(date, 333);
    }
    return res;
}

console.log(test());
