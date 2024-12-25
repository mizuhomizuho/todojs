import express, {Request, Response} from 'express';
import {ControllerUser} from "./controller/user";
import {ServiceContext} from "./service/context";
import {App} from "./app";

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

app.post('/api/todo/add', (req: Request, res: Response) => {
    res.send('add');
});

app.put('/api/todo/edit', (req: Request, res: Response) => {
    res.send('edit');
});

app.get('/api/todo/list', (req: Request, res: Response) => {
    res.send('list');
});

app.delete('/api/todo/delete', (req: Request, res: Response) => {
    res.send('delete');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});