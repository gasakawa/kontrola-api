import express from 'express';
import cors from 'cors';
import { contentType, corsResponseHeaders } from 'main/middlewares';
import { configRoutes } from './routes';

const app = express();
app.use(
  cors({
    origin: '*',
  }),
);
app.use(corsResponseHeaders);
app.use(contentType);
app.use(express.json());
configRoutes(app);

export default app;
