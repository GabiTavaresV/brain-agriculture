import 'reflect-metadata';
import express, { json } from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

import { routes } from './routes';

export const app = express();

app.use(json());

app.use(routes);
