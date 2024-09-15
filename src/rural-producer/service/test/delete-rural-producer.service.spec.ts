import { RuralProducerRepository } from '../../repositories/implementations/rural-producer';
import { DeleteRuralProducerService } from '../delete-rural-producer-service';

const mockRepository: Partial<RuralProducerRepository> = {
  isAlreadyDeleted: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  exists: jest.fn(),
  getTotalFarms: jest.fn(),
  getTotalArea: jest.fn(),
  getFarmsByState: jest.fn(),
  getFarmsByCrop: jest.fn(),
  getLandUse: jest.fn(),
  findById: jest.fn(),
};

describe('DeleteRuralProducerService', () => {
  let service: DeleteRuralProducerService;

  beforeEach(() => {
    service = new DeleteRuralProducerService(mockRepository as RuralProducerRepository);
  });

  it('should throw an error if the record is already deleted', async () => {
    const id = '123';
    (mockRepository.isAlreadyDeleted as jest.Mock).mockResolvedValue(true);

    await expect(service.execute({ id })).rejects.toThrow('Registro já excluído.');
    expect(mockRepository.isAlreadyDeleted).toHaveBeenCalledWith(id);
    expect(mockRepository.delete).not.toHaveBeenCalled();
  });

  it('should delete the record and return a success message', async () => {
    const id = '123';
    (mockRepository.isAlreadyDeleted as jest.Mock).mockResolvedValue(false);
    (mockRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const result = await service.execute({ id });

    expect(result).toEqual({ message: 'Produtor Rural excluído com sucesso.' });
    expect(mockRepository.isAlreadyDeleted).toHaveBeenCalledWith(id);
    expect(mockRepository.delete).toHaveBeenCalledWith({ id });
  });
});
