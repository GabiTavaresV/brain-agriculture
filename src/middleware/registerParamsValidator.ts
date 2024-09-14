import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const cpfRegex = /^(\d{3}\.\d{3}\.\d{3}\-\d{2}|\d{11})$/;
const cnpjRegex = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}|\d{14})$/;

const schema = Joi.object({
  taxId: Joi.string()
    .custom((value, helpers) => {
      if (cpfRegex.test(value) || cnpjRegex.test(value)) {
        return value;
      }

      return helpers.error("any.invalid", {
        message: "taxId deve ser um CPF ou CNPJ válido",
      });
    })
    .required(),

  producerName: Joi.string().min(3).max(100).required(),
  farmName: Joi.string().min(3).max(100).required(),
  city: Joi.string().min(3).max(100).required(),
  state: Joi.string().length(2).required(),
  totalFarmArea: Joi.number().precision(2).min(0).required(),
  arableArea: Joi.number().precision(2).min(0).required(),
  vegetationArea: Joi.number().precision(2).min(0).required(),
  plantedCrops: Joi.array()
    .items(Joi.string().min(2).max(30))
    .min(1)
    .required(),
});

export const registerParamsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
