import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger/swagger';
import apiRouter from './api/index.routes';
import cors from 'cors';

const app: Express = express();

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.get('/health', (req, res) => {
  res.send('server running');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', apiRouter);

export default app;
