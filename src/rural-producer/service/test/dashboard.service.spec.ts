import { RuralProducerRepository } from '../../repositories/implementations/rural-producer';
import { DashboardService } from '../dashboard-service';

const mockRuralProducerRepository = {
  getTotalFarms: jest.fn(),
  getTotalArea: jest.fn(),
  getFarmsByState: jest.fn(),
  getFarmsByCrop: jest.fn(),
  getLandUse: jest.fn(),
};

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    service = new DashboardService(mockRuralProducerRepository as unknown as RuralProducerRepository);
  });

  it('should return total farms', async () => {
    const expectedTotalFarms = 100;
    (mockRuralProducerRepository.getTotalFarms as jest.Mock).mockResolvedValue(expectedTotalFarms);

    const result = await service.totalFarms();

    expect(result).toBe(expectedTotalFarms);
    expect(mockRuralProducerRepository.getTotalFarms).toHaveBeenCalled();
  });

  it('should return total area', async () => {
    const expectedTotalArea = 2000;
    (mockRuralProducerRepository.getTotalArea as jest.Mock).mockResolvedValue(expectedTotalArea);

    const result = await service.totalArea();

    expect(result).toBe(expectedTotalArea);
    expect(mockRuralProducerRepository.getTotalArea).toHaveBeenCalled();
  });

  it('should return states pie chart data', async () => {
    const expectedStatesData = 300;
    (mockRuralProducerRepository.getFarmsByState as jest.Mock).mockResolvedValue(expectedStatesData);

    const result = await service.statesPieChart();

    expect(result).toBe(expectedStatesData);
    expect(mockRuralProducerRepository.getFarmsByState).toHaveBeenCalled();
  });

  it('should return crops pie chart data', async () => {
    const expectedCropsData = 400;
    (mockRuralProducerRepository.getFarmsByCrop as jest.Mock).mockResolvedValue(expectedCropsData);

    const result = await service.cropsPieChart();

    expect(result).toBe(expectedCropsData);
    expect(mockRuralProducerRepository.getFarmsByCrop).toHaveBeenCalled();
  });

  it('should return land use pie chart data', async () => {
    const expectedLandUseData = 500;
    (mockRuralProducerRepository.getLandUse as jest.Mock).mockResolvedValue(expectedLandUseData);

    const result = await service.landUsePieChart();

    expect(result).toBe(expectedLandUseData);
    expect(mockRuralProducerRepository.getLandUse).toHaveBeenCalled();
  });
});
