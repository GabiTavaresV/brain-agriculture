import { RuralProducerRepository } from "../repositories/implementations/rural-producer";

export class DashboardService {
  constructor(private readonly repository: RuralProducerRepository) {}

  public async totalFarms() {
    return await this.repository.getTotalFarms();
  }

  public async totalArea() {
    return await this.repository.getTotalArea();
  }

  public async statesPieChart() {
    return await this.repository.getFarmsByState();
  }

  public async cropsPieChart() {
    return await this.repository.getFarmsByCrop();
  }

  public async landUsePieChart() {
    return await this.repository.getLandUse();
  }
}
