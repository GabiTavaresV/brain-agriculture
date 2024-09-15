import { NextFunction, Request, Response } from 'express';

import Joi from 'joi';

const schema = Joi.object({
  totalFarmArea: Joi.number().precision(2).min(0),
  arableArea: Joi.number().precision(2).min(0),
  vegetationArea: Joi.number().precision(2).min(0),
  plantedCrops: Joi.array().items(Joi.string().min(2).max(30)).min(1),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const updateParamsValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
