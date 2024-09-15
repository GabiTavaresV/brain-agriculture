import { Router } from 'express';

import { loginRouter } from '../login/routes/login';
import { dashboardRouter } from '../rural-producer/routes/dashboard';
import { agricultureRouter } from '../rural-producer/routes/rural-producer';

export const routes = Router();

routes.use('/agriculture', agricultureRouter);
routes.use('/dashboard', dashboardRouter);
routes.use('/login', loginRouter);
