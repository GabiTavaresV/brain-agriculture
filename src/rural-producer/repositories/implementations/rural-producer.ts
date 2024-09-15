import { Repository } from 'typeorm';

import { config } from '../../../config/typeorm-config';
import { IFarmData, IRegisterRuralProducer, IUpdateParams } from '../../interfaces/interfaces';
import { FarmData } from '../entity/rural-producer';

export class RuralProducerRepository {
  private ormRepository: Repository<FarmData>;

  public constructor() {
    this.ormRepository = config.getRepository(FarmData);
  }

  public async create({
    taxId,
    producerName,
    farmName,
    city,
    state,
    totalFarmArea,
    arableArea,
    vegetationArea,
    plantedCrops,
  }: IRegisterRuralProducer): Promise<IFarmData> {
    const result = await this.ormRepository.query(
      `INSERT INTO brain_agriculture.farm_data (
        tax_id, producer_name, farm_name, city, state, total_farm_area, arable_area, vegetation_area, planted_crops
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::TEXT[])
        RETURNING * `,
      [taxId, producerName, farmName, city, state, totalFarmArea, arableArea, vegetationArea, plantedCrops],
    );
    return result[0];
  }

  public async update({ id, totalFarmArea, arableArea, vegetationArea, plantedCrops }: IUpdateParams): Promise<any> {
    let query = `UPDATE brain_agriculture.farm_data SET `;
    const params: any[] = [];
    let index = 1;

    if (totalFarmArea !== undefined) {
      query += `total_farm_area = $${index++}, `;
      params.push(totalFarmArea);
    }
    if (arableArea !== undefined) {
      query += `arable_area = $${index++}, `;
      params.push(arableArea);
    }
    if (vegetationArea !== undefined) {
      query += `vegetation_area = $${index++}, `;
      params.push(vegetationArea);
    }
    if (plantedCrops !== undefined) {
      query += `planted_crops = $${index++}, `;
      params.push(plantedCrops);
    }

    query += `updated_at = NOW()`;

    query = query.replace(/, \s*$/, '');
    query += ` WHERE id = $${index}`;
    params.push(id);

    return this.ormRepository.query(query, params);
  }

  public async delete({ id }: any): Promise<any> {
    return this.ormRepository.query(
      `UPDATE brain_agriculture.farm_data
       SET deleted_at = NOW()
       WHERE id = $1`,
      [id],
    );
  }

  public async exists(taxId: string): Promise<boolean> {
    const result = await this.ormRepository.query(
      `SELECT COUNT(*) FROM brain_agriculture.farm_data WHERE tax_id = $1`,
      [taxId],
    );
    return parseInt(result[0].count, 10) > 0;
  }

  public async getTotalFarms(): Promise<number> {
    const result = await this.ormRepository.query(`SELECT COUNT(*) FROM brain_agriculture.farm_data`);

    return parseInt(result[0].count, 10);
  }

  public async getTotalArea(): Promise<number> {
    const result = await this.ormRepository.query(`SELECT SUM(total_farm_area) FROM brain_agriculture.farm_data`);
    return parseFloat(result[0].sum);
  }

  public async getFarmsByState(): Promise<number> {
    return this.ormRepository.query(`SELECT state, COUNT(*) as count FROM brain_agriculture.farm_data GROUP BY state`);
  }

  public async getFarmsByCrop(): Promise<number> {
    return this.ormRepository.query(
      `SELECT planted_crops, COUNT(*) as count FROM brain_agriculture.farm_data GROUP BY planted_crops`,
    );
  }

  public async getLandUse(): Promise<number> {
    return this.ormRepository.query(
      `SELECT
        SUM(arable_area) as total_arable_area,
        SUM(vegetation_area) as total_vegetation_area
      FROM brain_agriculture.farm_data`,
    );
  }

  public async isAlreadyDeleted(id: string): Promise<boolean> {
    const result = await this.ormRepository.query(`SELECT deleted_at FROM brain_agriculture.farm_data WHERE id = $1`, [
      id,
    ]);

    return result.length > 0 && result[0].deleted_at !== null;
  }

  public async findById(id: string): Promise<FarmData | null> {
    const result = await this.ormRepository.query('SELECT * FROM brain_agriculture.farm_data WHERE id = $1', [id]);

    if (result.length > 0) {
      return result[0];
    }

    return null;
  }
}
