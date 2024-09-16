export interface RegisterRuralProducerParams {
  taxId: string;
  producerName: string;
  farmName: string;
  city: string;
  state: string;
  totalFarmArea: number;
  arableArea: number;
  vegetationArea: number;
  plantedCrops: string[];
}

export interface UpdateParams {
  id: string;
  totalFarmArea?: number;
  arableArea?: number;
  vegetationArea?: number;
  plantedCrops?: string[];
}

export interface FarmResponse {
  id: number;
  tax_id: string;
  producer_name: string;
  farm_name: string;
  city: string;
  state: string;
  total_farm_area: string;
  arable_area: string;
  vegetation_area: string;
  planted_crops: string[];
  created_at: Date;
  updated_at: Date;
}

export interface TotalFarmsResponse {
  totalFarms: number;
}

export interface TotalAreaResponse {
  totalArea: number;
}

export interface TotaFarmsByStateResponse {
  state: string;
  count: number;
}

export interface StatesPieChartResponse {
  statesPieChart: TotaFarmsByStateResponse[];
}

export interface TotaFarmsByCropResponse {
  planted_crops: string[];
  count: number;
}

export interface TotaLandUseResponse {
  total_arable_area: number;
  total_vegetation_area: number;
}

export interface UpdateResponse {
  rows: any[];
  affectedRows: number;
}

export interface DeleteResponse {
  rows: any[];
  affectedRows: number;
}

export interface DashboardServiceInterface {
  totalFarms(): Promise<TotalFarmsResponse>;
  totalArea(): Promise<TotalAreaResponse>;
  statesPieChart(): Promise<StatesPieChartResponse>;
  cropsPieChart(): Promise<TotaFarmsByCropResponse>;
  landUsePieChart(): Promise<TotaLandUseResponse>;
}
