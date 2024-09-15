import { Request, Response } from 'express';

export class HealthCheckController {
  public async start(_request: Request, response: Response): Promise<void> {
    response.status(200).json({ status: 'UP' });
  }
}
