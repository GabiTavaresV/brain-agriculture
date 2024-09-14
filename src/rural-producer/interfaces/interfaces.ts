export interface IRegisterRuralProducer {
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

export interface IFarmData {
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
