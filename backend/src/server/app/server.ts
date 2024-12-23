

import express, {Request, Response} from 'express';

const app = express();
const port = 8000;

app.use(express.json());

app.get('', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


// import express, {Request, Response} from 'express';
//
// const app = express();
// // const cors = require('cors');
// const port = 8000;
//
// // require('dotenv').config();
//
// app.use(express.json());
// // app.use(cors());
//
// app.get('', (req: Request, res: Response) => {
//     res.send('Hello!');
// });
//
// app.get('test', (req: Request, res: Response) => {
//     res.send('Hello!');
// });
//
// app.post('/api/user/authenticate', (req: Request, res: Response) => {
//     res.send('Hello, TypeScript with Express!');
// });
//
// app.post('/api/user/register', (req: Request, res: Response) => {
//
//     // console.log(req.body);
//     // res.send({
//     //     username: process.env.JWT_SECRET,
//     //     username1: 3,
//     // });
//     res.send('Hello, TypeScript with Express!');
// });
//
// app.post('/api/todo/add', (req: Request, res: Response) => {
//     res.send('Hello, TypeScript with Express!');
// });
//
// app.put('/api/todo/edit', (req: Request, res: Response) => {
//     res.send('Hello, TypeScript with Express!');
// });
//
// app.get('/api/todo/list', (req: Request, res: Response) => {
//     res.send('Hello, TypeScript with Express!');
// });
//
// app.delete('/api/todo/delete', (req: Request, res: Response) => {
//     res.send('Hello, TypeScript with Express!');
// });
//
// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });