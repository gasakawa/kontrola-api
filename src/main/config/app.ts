import express from 'express';
import cors from 'cors';
import { contentType, corsResponseHeaders } from 'main/middlewares';
import { getLanguage } from 'main/middlewares/language';
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
app.use(getLanguage);
configRoutes(app);

export default app;
