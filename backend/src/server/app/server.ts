import express, {Request, Response} from 'express';

const app = express();
const port = 8000;

app.use(express.json());

app.get('', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!1');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});