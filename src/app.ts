import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import { routes } from "./routes";

export const app = express();

app.use(json());

app.use(routes);
