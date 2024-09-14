import { RuralProducerRepository } from "../repositories/implementations/rural-producer";

export class DeleteRuralProducerService {
  constructor(private readonly repository: RuralProducerRepository) {}

  public async execute({ taxId }: any): Promise<any> {
    const result = await this.repository.delete({ taxId });

    if (result.rowCount === 0) {
      throw new Error("Registro não encontrado ou já excluído.");
    }

    return { message: "Produtor Rural excluído com sucesso." };
  }
}
