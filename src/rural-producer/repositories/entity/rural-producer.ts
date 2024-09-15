import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FarmData {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public tax_id: string;

  @Column({ type: 'varchar' })
  public producer_name: string;

  @Column({ type: 'varchar' })
  public farm_name: string;

  @Column({ type: 'varchar' })
  public city: string;

  @Column({ type: 'varchar' })
  public state: string;

  @Column({ type: 'decimal' })
  public total_area_farm: number;

  @Column({ type: 'decimal' })
  public arable_area: number;

  @Column({ type: 'decimal' })
  public vegetation_area: number;

  @Column({ type: 'text', array: true })
  public planted_crops: string[];

  @Column({ type: 'timestamp' })
  public created_at: Date;

  @Column({ type: 'timestamp' })
  public updated_at: Date;

  @Column({ type: 'timestamp' })
  public deleted_at: Date;
}
