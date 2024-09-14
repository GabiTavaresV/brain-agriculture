import { Router } from "express";
import { RuralProducerController } from "../controller/rural-producer-controller";
import { registerParamsValidator } from "../../middleware/registerParamsValidator";
import { authenticateToken } from "../../middleware/authenticateToken";
import { updateParamsValidator } from "../../middleware/updateParamsValidator";

export const agricultureRouter = Router();

const controller = new RuralProducerController();

agricultureRouter.post(
  "/register/rural-producer",
  authenticateToken,
  registerParamsValidator,
  controller.register
);

agricultureRouter.patch(
  "/update/rural-producer/:id",
  authenticateToken,
  updateParamsValidator,
  controller.update
);

agricultureRouter.delete(
  "/delete/rural-producer/:id",
  authenticateToken,
  controller.delete
);
