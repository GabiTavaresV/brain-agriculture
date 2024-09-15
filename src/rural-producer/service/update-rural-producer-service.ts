import { BaseService } from './base-service';

export class UpdateRuralProducerService extends BaseService<any, any> {
  public async execute(input: any): Promise<any> {
    return this.repository.update(input);
  }
}
