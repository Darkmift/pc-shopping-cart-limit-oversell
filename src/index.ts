import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import apiRouter from './api/index.routes';

const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.get('/health', (req, res) => {
  res.send('server running');
});

app.use('/api/v1', apiRouter);

export default app;
