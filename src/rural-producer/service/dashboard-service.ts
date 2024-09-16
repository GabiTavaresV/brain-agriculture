import {
  DashboardServiceInterface,
  TotaFarmsByCropResponse,
  TotaFarmsByStateResponse,
  TotaLandUseResponse,
  TotalAreaResponse,
  TotalFarmsResponse,
} from '../interfaces/interfaces';
import { RuralProducerRepository } from '../repositories/implementations/rural-producer';

export class DashboardService implements DashboardServiceInterface {
  public constructor(private readonly repository: RuralProducerRepository) {}

  public async totalFarms(): Promise<TotalFarmsResponse> {
    return this.repository.getTotalFarms();
  }

  public async totalArea(): Promise<TotalAreaResponse> {
    return this.repository.getTotalArea();
  }

  public async statesPieChart(): Promise<TotaFarmsByStateResponse> {
    return this.repository.getFarmsByState();
  }

  public async cropsPieChart(): Promise<TotaFarmsByCropResponse> {
    return this.repository.getFarmsByCrop();
  }

  public async landUsePieChart(): Promise<TotaLandUseResponse> {
    return this.repository.getLandUse();
  }
}
