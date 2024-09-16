import { Repository } from 'typeorm';

import { config } from '../../../config/typeorm-config';
import {
  DeleteResponse,
  FarmResponse,
  RegisterRuralProducerParams,
  TotaFarmsByCropResponse,
  TotaFarmsByStateResponse,
  TotaLandUseResponse,
  TotalAreaResponse,
  TotalFarmsResponse,
  UpdateParams,
  UpdateResponse,
} from '../../interfaces/interfaces';
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
  }: RegisterRuralProducerParams): Promise<FarmResponse> {
    const result = await this.ormRepository.query(
      `INSERT INTO brain_agriculture.farm_data (
        tax_id, producer_name, farm_name, city, state, total_farm_area, arable_area, vegetation_area, planted_crops
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::TEXT[])
        RETURNING * `,
      [taxId, producerName, farmName, city, state, totalFarmArea, arableArea, vegetationArea, plantedCrops],
    );
    return result[0];
  }

  public async update({
    id,
    totalFarmArea,
    arableArea,
    vegetationArea,
    plantedCrops,
  }: UpdateParams): Promise<UpdateResponse> {
    const setClauses: string[] = [];
    const params: any[] = [];
    let index = 1;

    if (totalFarmArea !== undefined) {
      setClauses.push(`total_farm_area = $${index++}`);
      params.push(totalFarmArea);
    }
    if (arableArea !== undefined) {
      setClauses.push(`arable_area = $${index++}`);
      params.push(arableArea);
    }
    if (vegetationArea !== undefined) {
      setClauses.push(`vegetation_area = $${index++}`);
      params.push(vegetationArea);
    }
    if (plantedCrops !== undefined) {
      setClauses.push(`planted_crops = $${index++}`);
      params.push(plantedCrops);
    }

    if (setClauses.length === 0) {
      throw new Error('Nenhum campo para atualizar');
    }

    const query = `UPDATE brain_agriculture.farm_data SET ${setClauses.join(', ')}, updated_at = NOW() WHERE id = $${index}`;
    params.push(id);

    return this.ormRepository.query(query, params);
  }

  public async delete({ id }: any): Promise<DeleteResponse> {
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

  public async getTotalFarms(): Promise<TotalFarmsResponse> {
    const query = await this.ormRepository.query(`SELECT COUNT(*) FROM brain_agriculture.farm_data`);
    const totalFarms = parseInt(query[0].count, 10);
    return { totalFarms };
  }

  public async getTotalArea(): Promise<TotalAreaResponse> {
    const query = await this.ormRepository.query(`SELECT SUM(total_farm_area) FROM brain_agriculture.farm_data`);
    const totalArea = parseFloat(query[0].sum);
    return { totalArea };
  }

  public async getFarmsByState(): Promise<TotaFarmsByStateResponse> {
    const totaFarmsByState = await this.ormRepository.query(
      `SELECT state, COUNT(*) as count FROM brain_agriculture.farm_data GROUP BY state`,
    );

    const formattedResult = totaFarmsByState.map((item: { state: string; count: string }) => ({
      state: item.state,
      count: parseInt(item.count, 10),
    }));

    return formattedResult;
  }

  public async getFarmsByCrop(): Promise<TotaFarmsByCropResponse> {
    const totalFarmsByCrop = await this.ormRepository.query(
      `SELECT planted_crops, COUNT(*) as count FROM brain_agriculture.farm_data GROUP BY planted_crops`,
    );

    const formattedResult = totalFarmsByCrop.map((item: { planted_crops: string[]; count: string }) => ({
      plantedCrops: item.planted_crops,
      count: parseInt(item.count, 10),
    }));

    return formattedResult;
  }

  public async getLandUse(): Promise<TotaLandUseResponse> {
    const totalLandUse = await this.ormRepository.query(
      `SELECT
        SUM(arable_area) as total_arable_area,
        SUM(vegetation_area) as total_vegetation_area
      FROM brain_agriculture.farm_data`,
    );

    const { total_arable_area, total_vegetation_area } = totalLandUse[0];

    return {
      total_arable_area: parseFloat(total_arable_area),
      total_vegetation_area: parseFloat(total_vegetation_area),
    };
  }

  public async isAlreadyDeleted(id: string): Promise<boolean> {
    const result = await this.ormRepository.query(`SELECT deleted_at FROM brain_agriculture.farm_data WHERE id = $1`, [
      id,
    ]);

    return result.length > 0 && result[0].deleted_at !== null;
  }

  public async findById(id: string): Promise<FarmResponse | null> {
    const result = await this.ormRepository.query('SELECT * FROM brain_agriculture.farm_data WHERE id = $1', [id]);

    if (result.length > 0) {
      return result[0];
    }

    return null;
  }
}
