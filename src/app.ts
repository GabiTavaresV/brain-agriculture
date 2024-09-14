import express, { json } from "express";
import "reflect-metadata";
import { routes } from "./routes";

export const app = express();

app.use(json());

app.use(routes);
