import express, {Request, Response} from 'express';
import {ControllerUser} from "./controller/user";
import {ServiceContext} from "./service/context";
import {App} from "./app";
import {ControllerTodo} from "./controller/todo";

const app = express();
const cors = require('cors');
const port = 8000;

app.use(express.json());
app.use(cors());
require('dotenv').config({path: '/todojs/.env'});

app.get('', (req: Request, res: Response) => {
    res.send('Hello!');
});

app.post('/api/user/authenticate', async (req: Request, res: Response) => {
    App.context = new ServiceContext.Main(req, res);
    const controller = new ControllerUser.Main();
    await controller.authenticate();
});

app.post('/api/user/register', async (req: Request, res: Response) => {
    App.context = new ServiceContext.Main(req, res);
    const controller = new ControllerUser.Main();
    await controller.register();
});

app.post('/api/todo/add', async (req: Request, res: Response) => {
    App.context = new ServiceContext.Main(req, res);
    const controller = new ControllerTodo.Main();
    await controller.add();
});

app.post('/api/todo/edit', (req: Request, res: Response) => {
    App.context = new ServiceContext.Main(req, res);
    const controller = new ControllerTodo.Main();
    await controller.edit();
});

app.post('/api/todo/get', async (req: Request, res: Response) => {
    App.context = new ServiceContext.Main(req, res);
    const controller = new ControllerTodo.Main();
    await controller.get();
});

app.post('/api/todo/list', (req: Request, res: Response) => {
    res.send('list');
});

app.post('/api/todo/delete', (req: Request, res: Response) => {
    res.send('delete');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});