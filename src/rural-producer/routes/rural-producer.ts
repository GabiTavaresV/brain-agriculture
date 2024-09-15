import { Router } from 'express';

import { authenticateToken } from '../../middleware/authenticateToken';
import { registerParamsValidator } from '../../middleware/registerParamsValidator';
import { updateParamsValidator } from '../../middleware/updateParamsValidator';
import { RuralProducerController } from '../controller/rural-producer-controller';

export const agricultureRouter = Router();

const controller = new RuralProducerController();

agricultureRouter.post('/register/rural-producer', authenticateToken, registerParamsValidator, controller.register);

agricultureRouter.patch('/update/rural-producer/:id', authenticateToken, updateParamsValidator, controller.update);

agricultureRouter.delete('/delete/rural-producer/:id', authenticateToken, controller.delete);
