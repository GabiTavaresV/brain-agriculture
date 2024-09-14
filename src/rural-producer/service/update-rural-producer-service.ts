import { RuralProducerRepository } from "../repositories/implementations/rural-producer";

export class UpdateRuralProducerService {
  constructor(private readonly repository: RuralProducerRepository) {}
  public async execute({
    id,
    totalFarmArea,
    arableArea,
    vegetationArea,
    plantedCrops,
  }: any): Promise<any> {
    return this.repository.update({
      id,
      totalFarmArea,
      arableArea,
      vegetationArea,
      plantedCrops,
    });
  }
}
