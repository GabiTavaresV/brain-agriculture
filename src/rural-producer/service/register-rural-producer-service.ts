import { BaseService } from './base-service';
import { formatTaxId } from '../../utils/format-taxId';
import { FarmResponse, RegisterRuralProducerParams } from '../interfaces/interfaces';

export class RegisterRuralProducerService extends BaseService<RegisterRuralProducerParams, FarmResponse> {
  public async execute(input: RegisterRuralProducerParams): Promise<FarmResponse> {
    const { taxId, arableArea, vegetationArea, totalFarmArea } = input;

    const formattedTaxId = formatTaxId(taxId);

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
