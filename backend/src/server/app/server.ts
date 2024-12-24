import express, {Request, Response} from 'express';
import {TodojsControllerUser} from "./controller/user";

const app = express();
const cors = require('cors');
const port = 8000;

app.use(express.json());
app.use(cors());
require('dotenv').config({path: '/todojs/.env'});

app.get('', (req: Request, res: Response) => {
    res.send('Hello!');
});

app.post('/api/user/authenticate', (req: Request, res: Response) => {
    res.send('authenticate');
});

app.post('/api/user/register', async (req: Request, res: Response) => {
    const controller = new TodojsControllerUser.Main(req, res);
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