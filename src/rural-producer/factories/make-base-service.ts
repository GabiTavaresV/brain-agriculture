import { RuralProducerRepository } from "../repositories/implementations/rural-producer";

export const makeBaseService = <T>(
  ServiceClass: new (repository: RuralProducerRepository) => T
): T => {
  const repository = new RuralProducerRepository();
  return new ServiceClass(repository);
};
