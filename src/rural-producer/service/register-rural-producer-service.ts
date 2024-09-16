import { BaseService } from './base-service';
import { formatTaxId } from '../../utils/format-taxId';
import { validateCrops } from '../../utils/validate-crops';
import { FarmResponse, RegisterRuralProducerParams } from '../interfaces/interfaces';

export class RegisterRuralProducerService extends BaseService<RegisterRuralProducerParams, FarmResponse> {
  public async execute(input: RegisterRuralProducerParams): Promise<FarmResponse> {
    const { taxId, arableArea, vegetationArea, totalFarmArea, plantedCrops } = input;

    const formattedTaxId = formatTaxId(taxId);

    const lowerCaseCrops = plantedCrops.map((crop) => crop.toLowerCase());

    if (!validateCrops(lowerCaseCrops)) {
      throw new Error('Culturas plantadas não faz parte da listagem');
    }

    if (await this.checkIfExists(formattedTaxId)) {
      throw new Error('O tax_id informado já está cadastrado.');
    }

    if (arableArea + vegetationArea > totalFarmArea) {
      throw new Error('A soma da área agricultável e da vegetação não pode ser maior que a área total da fazenda.');
    }

    const updatedInput = { ...input, taxId: formattedTaxId };

    return this.repository.create(updatedInput);
  }
}
