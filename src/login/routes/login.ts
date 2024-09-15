import { Router } from "express";
import { LoginController } from "../controller/login-controller";

export const loginRouter = Router();

const controller = new LoginController();

loginRouter.post("/", controller.login);
