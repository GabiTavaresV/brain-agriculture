import { IFarmData, IRegisterRuralProducer } from "../interfaces/dtos";
import { RuralProducerRepository } from "../repositories/implementations/rural-producer";

export class RegisterRuralProducerService {
  constructor(private readonly repository: RuralProducerRepository) {}

  public async execute({
    taxId,
    producerName,
    farmName,
    city,
    state,
    totalFarmArea,
    arableArea,
    vegetationArea,
    plantedCrops,
  }: IRegisterRuralProducer): Promise<IFarmData> {
    try {
      const exists = await this.repository.exists(taxId);
      if (exists) {
        throw new Error("O tax_id informado já está cadastrado.");
      }

      if (arableArea + vegetationArea > totalFarmArea) {
        throw new Error(
          "A soma da área agricultável e da vegetação não pode ser maior que a área total da fazenda."
        );
      }

      const registerRuralProducer = await this.repository.create({
        taxId,
        producerName,
        farmName,
        city,
        state,
        totalFarmArea,
        arableArea,
        vegetationArea,
        plantedCrops,
      });

      return registerRuralProducer;
    } catch (error) {
      console.error("Erro ao cadastrar produtor rural:", error);
      throw error;
    }
  }
}
