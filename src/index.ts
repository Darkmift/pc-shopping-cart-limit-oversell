import express, { Express } from 'express';

const app: Express = express();

app.use(express.json());
app.get('/health', (req, res) => {
  res.send('server running');
});

export default app;
