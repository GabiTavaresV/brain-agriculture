import { BaseService } from './base-service';
import { formatTaxId } from '../../utils/format-taxId';
import { IFarmData, IRegisterRuralProducer } from '../interfaces/interfaces';

export class RegisterRuralProducerService extends BaseService<IRegisterRuralProducer, IFarmData> {
  public async execute(input: IRegisterRuralProducer): Promise<IFarmData> {
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
