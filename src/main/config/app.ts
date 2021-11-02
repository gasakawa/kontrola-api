import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
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
app.use(morgan(':method :url :status :req[header] :res[header] :response-time[3] :total-time[3] :user-agent'));
configRoutes(app);

export default app;
