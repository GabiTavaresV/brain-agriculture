import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FarmData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  tax_id: string;

  @Column({ type: "varchar" })
  producer_name: string;

  @Column({ type: "varchar" })
  farm_name: string;

  @Column({ type: "varchar" })
  city: string;

  @Column({ type: "varchar" })
  state: string;

  @Column({ type: "decimal" })
  total_area_farm: number;

  @Column({ type: "decimal" })
  arable_area: number;

  @Column({ type: "decimal" })
  vegetation_area: number;

  @Column({ type: "text", array: true })
  planted_crops: string[];

  @Column({ type: "timestamp" })
  created_at: Date;

  @Column({ type: "timestamp" })
  updated_at: Date;

  @Column({ type: "timestamp" })
  deleted_at: Date;
}
