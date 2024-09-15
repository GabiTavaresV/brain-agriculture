import { RuralProducerRepository } from '../repositories/implementations/rural-producer';

export abstract class BaseService<TInput, TOutput> {
  public constructor(protected readonly repository: RuralProducerRepository) {}

  public abstract execute(input: TInput): Promise<TOutput>;

  protected async checkIfExists(taxId: string): Promise<boolean> {
    return this.repository.exists(taxId);
  }

  protected handleNotFound(rowCount: number, message: string): void {
    if (rowCount === 0) {
      throw new Error(message);
    }
  }
}
