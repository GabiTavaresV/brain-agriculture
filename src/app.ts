import 'reflect-metadata';
import express, { json } from 'express';

import { routes } from './routes';

export const app = express();

app.use(json());

app.use(routes);
