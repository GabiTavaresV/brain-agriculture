import { UpdateParams } from '../../interfaces/interfaces';
import { UpdateRuralProducerService } from '../update-rural-producer-service';

describe('UpdateRuralProducerService', () => {
  let service: UpdateRuralProducerService;
  let repositoryMock: any;

  beforeEach(() => {
    repositoryMock = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    service = new UpdateRuralProducerService(repositoryMock);
  });

  it('should throw an error if no parameters are provided', async () => {
    await expect(service.execute({} as UpdateParams)).rejects.toThrow(
      'Pelo menos um parâmetro deve ser fornecido para atualização.',
    );
  });

  it('should throw an error if the record is not found', async () => {
    repositoryMock.findById.mockResolvedValue(null);

    await expect(service.execute({ id: 1, arableArea: 500 } as unknown as UpdateParams)).rejects.toThrow(
      'Registro não encontrado.',
    );
  });

  it('should throw an error if the sum of arable and vegetation areas exceeds the total farm area', async () => {
    repositoryMock.findById.mockResolvedValue({
      total_farm_area: 100,
      arable_area: 50,
      vegetation_area: 20,
    });

    await expect(
      service.execute({
        id: '1',
        arableArea: 500,
        vegetationArea: 30,
      } as UpdateParams),
    ).rejects.toThrow('A soma da área agricultável e da vegetação não pode ser maior que a área total da fazenda.');
  });

  it('should call the update method with the correct parameters when all parameters are valid', async () => {
    repositoryMock.findById.mockResolvedValue({
      total_farm_area: 200,
      arable_area: 50,
      vegetation_area: 50,
    });

    const updateInput: UpdateParams = {
      id: '1',
      arableArea: 60,
      vegetationArea: 60,
    };

    await service.execute(updateInput);

    expect(repositoryMock.update).toHaveBeenCalledWith(updateInput);
  });
});
