import { Router } from "express";
import { agricultureRouter } from "../rural-producer/routes/rural-producer";
import { dashboardRouter } from "../rural-producer/routes/dashboard";
import { loginRouter } from "../login/routes/login";

export const routes = Router();

routes.use("/agriculture", agricultureRouter);
routes.use("/dashboard", dashboardRouter);
routes.use("/login", loginRouter);
