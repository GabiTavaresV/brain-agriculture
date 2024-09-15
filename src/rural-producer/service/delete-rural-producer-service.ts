import { BaseService } from './base-service';

export class DeleteRuralProducerService extends BaseService<{ taxId: string }, { message: string }> {
  public async execute({ taxId }: { taxId: string }): Promise<{ message: string }> {
    const result = await this.repository.delete({ taxId });

    this.handleNotFound(result.rowCount, 'Registro não encontrado ou já excluído.');

    return { message: 'Produtor Rural excluído com sucesso.' };
  }
}
