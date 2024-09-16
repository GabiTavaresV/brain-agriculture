import {
  DashboardServiceInterface,
  StatesPieChartResponse,
  TotaFarmsByCropResponse,
  TotaLandUseResponse,
  TotalAreaResponse,
  TotalFarmsResponse,
} from '../interfaces/interfaces';
import { RuralProducerRepository } from '../repositories/implementations/rural-producer';

export class DashboardService implements DashboardServiceInterface {
  public constructor(private readonly repository: RuralProducerRepository) {}

  public async totalFarms(): Promise<TotalFarmsResponse> {
    const mockTotalFrams = {
      totalFarms: 22,
    };

    return mockTotalFrams;
    return this.repository.getTotalFarms();
  }

  public async totalArea(): Promise<TotalAreaResponse> {
    const mockTotalArea = {
      totalArea: 20835,
    };

    return mockTotalArea;
    return this.repository.getTotalArea();
  }

  public async statesPieChart(): Promise<StatesPieChartResponse> {
    const mockStatesPieChart = {
      statesPieChart: [
        { state: 'SP', count: 2 },
        { state: 'PR', count: 3 },
        { state: 'MG', count: 17 },
      ],
    };
    return mockStatesPieChart;
    return this.repository.getFarmsByState();
  }

  public async cropsPieChart(): Promise<TotaFarmsByCropResponse> {
    return this.repository.getFarmsByCrop();
  }

  public async landUsePieChart(): Promise<TotaLandUseResponse> {
    return this.repository.getLandUse();
  }
}
