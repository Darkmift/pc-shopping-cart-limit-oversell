import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '@/../swagger/swagger';
import apiRouter from './api/index.routes';
import cors from 'cors';
import { seedData } from './common/drizzle/db';

const app: Express = express();

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.get('/health', (req, res) => {
  res.send('server running');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', apiRouter);

// run sql seed
seedData();

export default app;
