import { RuralProducerRepository } from '../repositories/implementations/rural-producer';

export class DashboardService {
  public constructor(private readonly repository: RuralProducerRepository) {}

  public async totalFarms(): Promise<any> {
    return await this.repository.getTotalFarms();
  }

  public async totalArea(): Promise<any> {
    return await this.repository.getTotalArea();
  }

  public async statesPieChart(): Promise<any> {
    return await this.repository.getFarmsByState();
  }

  public async cropsPieChart(): Promise<any> {
    return await this.repository.getFarmsByCrop();
  }

  public async landUsePieChart(): Promise<any> {
    return await this.repository.getLandUse();
  }
}
