import { BaseService } from './base-service';

export class DeleteRuralProducerService extends BaseService<{ id: string }, { message: string }> {
  public async execute({ id }: { id: string }): Promise<{ message: string }> {
    if (await this.repository.isAlreadyDeleted(id)) {
      throw new Error('Registro já excluído.');
    }
    await this.repository.delete({ id });

    return { message: 'Produtor Rural excluído com sucesso.' };
  }
}
