import express, { Express } from 'express';
import dotenv from 'dotenv';
import { route } from './routes/routes';

dotenv.config();

export const app: Express = express();
export const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
})

app.set('views', '/views');
app.set('view engine', 'pug')

app.use('/', route);