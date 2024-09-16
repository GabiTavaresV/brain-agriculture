import { RegisterRuralProducerParams } from '../../../interfaces/interfaces';

export const registerRuralProducerInput: RegisterRuralProducerParams = {
  taxId: '123',
  producerName: 'Teste da Silva',
  farmName: 'Fazenda Teste',
  city: 'São Paulo',
  state: 'SP',
  totalFarmArea: 1000,
  arableArea: 500,
  vegetationArea: 200,
  plantedCrops: ['arroz', 'feijão'],
};

export const registerarableAreaVegetationAreaInput: RegisterRuralProducerParams = {
  taxId: '123',
  producerName: 'Teste da Silva',
  farmName: 'Fazenda Teste',
  city: 'São Paulo',
  state: 'SP',
  totalFarmArea: 1000,
  arableArea: 5000,
  vegetationArea: 200,
  plantedCrops: ['arroz', 'feijão'],
};
