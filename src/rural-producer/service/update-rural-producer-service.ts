import { BaseService } from './base-service';
import { UpdateParams, UpdateResponse } from '../interfaces/interfaces';

export class UpdateRuralProducerService extends BaseService<UpdateParams, UpdateResponse> {
  public async execute(input: UpdateParams): Promise<UpdateResponse> {
    const hasAtLeastOneParam =
      input.totalFarmArea !== undefined ||
      input.arableArea !== undefined ||
      input.vegetationArea !== undefined ||
      input.plantedCrops !== undefined;

    if (!hasAtLeastOneParam) {
      throw new Error('Pelo menos um parâmetro deve ser fornecido para atualização.');
    }

    let currentRecord;
    if (input.totalFarmArea === undefined || input.arableArea === undefined || input.vegetationArea === undefined) {
      currentRecord = await this.repository.findById(input.id);
      if (!currentRecord) {
        throw new Error('Registro não encontrado.');
      }
    }

    let totalFarmArea: number;

    if (input.totalFarmArea === undefined) {
      totalFarmArea = parseFloat(currentRecord?.total_farm_area ?? '0');
    } else {
      totalFarmArea = input.totalFarmArea;
    }

    if (isNaN(totalFarmArea)) {
      throw new Error('Área total da fazenda não está definida ou não é um número válido.');
    }

    const currentArableArea = parseFloat(currentRecord?.arable_area ?? '0');
    const currentVegetationArea = parseFloat(currentRecord?.vegetation_area ?? '0');

    const newArableArea = input.arableArea !== undefined ? input.arableArea : currentArableArea;
    const newVegetationArea = input.vegetationArea !== undefined ? input.vegetationArea : currentVegetationArea;

    if (newArableArea + newVegetationArea > totalFarmArea) {
      throw new Error('A soma da área agricultável e da vegetação não pode ser maior que a área total da fazenda.');
    }

    return this.repository.update(input);
  }
}
