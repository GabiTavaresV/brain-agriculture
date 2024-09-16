import { PlantedCropsEnum } from '../rural-producer/enum/planted-crops';

export const validateCrops = (crops: string[]): boolean => {
  const enumValues = Object.values(PlantedCropsEnum).map((crop) => crop.toLowerCase());
  return crops.every((crop) => enumValues.includes(crop.toLowerCase()));
};
