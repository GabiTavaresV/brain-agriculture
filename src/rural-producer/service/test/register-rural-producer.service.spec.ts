import { formatTaxId } from '../../../utils/format-taxId';
import { RuralProducerRepository } from '../../repositories/implementations/rural-producer';
import { RegisterRuralProducerService } from '../register-rural-producer-service';
import { registerRuralProducerInput, registerarableAreaVegetationAreaInput } from './mock/mock-service';

const mockRepository: Partial<RuralProducerRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
  getTotalFarms: jest.fn(),
  getTotalArea: jest.fn(),
  getFarmsByState: jest.fn(),
  getFarmsByCrop: jest.fn(),
  getLandUse: jest.fn(),
  findById: jest.fn(),
  isAlreadyDeleted: jest.fn(),
};

jest.mock('@/utils/format-taxId', () => ({
  formatTaxId: jest.fn(),
}));

describe('RegisterRuralProducerService', () => {
  let service: RegisterRuralProducerService;
  const mockFormatTaxId = formatTaxId as jest.Mock;

  beforeEach(() => {
    service = new RegisterRuralProducerService(mockRepository as RuralProducerRepository);
  });

  it('should throw an error if the taxId is already registered', async () => {
    mockFormatTaxId.mockReturnValue('89745612345');
    (mockRepository.exists as jest.Mock).mockResolvedValue(true);

    await expect(service.execute(registerRuralProducerInput)).rejects.toThrow('O tax_id informado já está cadastrado.');
    expect(mockFormatTaxId).toHaveBeenCalledWith(registerRuralProducerInput.taxId);
    expect(mockRepository.exists).toHaveBeenCalledWith('89745612345');
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('should throw an error if arableArea + vegetationArea is greater than totalFarmArea', async () => {
    mockFormatTaxId.mockReturnValue('45678978789456');
    (mockRepository.exists as jest.Mock).mockResolvedValue(false);

    await expect(service.execute(registerarableAreaVegetationAreaInput)).rejects.toThrow(
      'A soma da área agricultável e da vegetação não pode ser maior que a área total da fazenda.',
    );
    expect(mockFormatTaxId).toHaveBeenCalledWith(registerarableAreaVegetationAreaInput.taxId);
    expect(mockRepository.exists).toHaveBeenCalledWith('45678978789456');
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('should create a new record and return it if all validations pass', async () => {
    const formattedInput = { ...registerRuralProducerInput, taxid: '12345678911' };

    mockFormatTaxId.mockReturnValue('12345678911');
    (mockRepository.exists as jest.Mock).mockResolvedValue(false);
    (mockRepository.create as jest.Mock).mockResolvedValue(formattedInput);

    const result = await service.execute(registerRuralProducerInput);

    expect(result).toEqual(formattedInput);
    expect(mockFormatTaxId).toHaveBeenCalledWith(registerRuralProducerInput.taxId);
    expect(mockRepository.exists).toHaveBeenCalledWith('12345678911');
    expect(mockRepository.create).toHaveBeenCalledWith({ ...registerRuralProducerInput, taxId: '12345678911' });
  });
});
