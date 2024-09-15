import { Router } from 'express';

import { HealthCheckController } from '../controller/health-check-controller';

export const healthCheckRouter = Router();
const controller = new HealthCheckController();

healthCheckRouter.get('/', controller.start);
