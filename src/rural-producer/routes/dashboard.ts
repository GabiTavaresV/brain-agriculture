import { Router } from "express";
import { DashboardController } from "../controller/dashboard-controller";

export const dashboardRouter = Router();

const controller = new DashboardController();

dashboardRouter.get("/total-farms", controller.totalFarms);

dashboardRouter.get("/total-area", controller.totalArea);

dashboardRouter.get("/states-pie-chart", controller.statesPieChart);

dashboardRouter.get("/crops-pie-chart", controller.cropsPieChart);

dashboardRouter.get("/land-use-pie-chart", controller.landUsePieChart);
