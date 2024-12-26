import express, {Request, Response} from "express";
import {ControllerUser} from "./controller/user";
import {ControllerTodo} from "./controller/todo";
import {ServiceRouter} from "./service/router";

const app = express();
const cors = require('cors');
const port = 8000;

app.use(express.json());
app.use(cors());
require('dotenv').config({path: '/todojs/.env'});

app.get('', (req: Request, res: Response) => {
    res.send('Hello!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

[
    {
        route: '/api/user/authenticate',
        controller: ControllerUser.Main,
        method: 'authenticate',
    },
    {
        route: '/api/user/register',
        controller: ControllerUser.Main,
        method: 'register',
    },
    {
        route: '/api/todo/add',
        controller: ControllerTodo.Main,
        method: 'add',
    },
    {
        route: '/api/todo/edit',
        controller: ControllerTodo.Main,
        method: 'edit',
    },
    {
        route: '/api/todo/get',
        controller: ControllerTodo.Main,
        method: 'get',
    },
    {
        route: '/api/todo/list',
        controller: ControllerTodo.Main,
        method: 'list',
    },
    {
        route: '/api/todo/delete',
        controller: ControllerTodo.Main,
        method: 'delete',
    },
]
    .forEach((item) => {
        app.post(item.route, async (req: Request, res: Response) => {
            ServiceRouter.Main.init(item.controller, item.method, req, res);
        });
    });