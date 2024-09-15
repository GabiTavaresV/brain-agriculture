import { Request, Response } from 'express';

import { makeBaseService } from '../factories/make-base-service';
import { DashboardService } from '../service/dashboard-service';

export class DashboardController {
  public async totalFarms(_request: Request, response: Response): Promise<Response> {
    try {
      const dashboardService = makeBaseService(DashboardService);

      const totalFarms = await dashboardService.totalFarms();

      return response.json({ totalFarms });
    } catch (error) {
      console.error('Erro ao obter total de fazendas:', error);
      return response.status(500).json({ message: 'Erro ao obter dados.' });
    }
  }
  public async totalArea(_request: Request, response: Response): Promise<Response> {
    try {
      const dashboardService = makeBaseService(DashboardService);

      const totalArea = await dashboardService.totalArea();

      return response.json({ totalArea });
    } catch (error) {
      console.error('Erro ao obter area total de fazendas:', error);
      return response.status(500).json({ message: 'Erro ao obter dados.' });
    }
  }
  public async statesPieChart(_request: Request, response: Response): Promise<Response> {
    try {
      const dashboardService = makeBaseService(DashboardService);

      const statesPieChart = await dashboardService.statesPieChart();

      return response.json({ statesPieChart });
    } catch (error) {
      console.error('Erro ao obter total de fazendas por estado:', error);
      return response.status(500).json({ message: 'Erro ao obter dados.' });
    }
  }
  public async cropsPieChart(_request: Request, response: Response): Promise<Response> {
    try {
      const dashboardService = makeBaseService(DashboardService);

      const cropsPieChart = await dashboardService.cropsPieChart();

      return response.json({ cropsPieChart });
    } catch (error) {
      console.error('Erro ao obter total de fazendas por estado:', error);
      return response.status(500).json({ message: 'Erro ao obter dados.' });
    }
  }
  public async landUsePieChart(_request: Request, response: Response): Promise<Response> {
    try {
      const dashboardService = makeBaseService(DashboardService);

      const landUsePieChart = await dashboardService.landUsePieChart();

      return response.json({ landUsePieChart });
    } catch (error) {
      console.error('Erro ao obter total de fazendas por estado:', error);
      return response.status(500).json({ message: 'Erro ao obter dados.' });
    }
  }
}
