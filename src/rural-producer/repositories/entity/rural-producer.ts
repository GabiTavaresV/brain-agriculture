import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RuralProducer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taxId: string;

  @Column()
  producerName: string;

  @Column()
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  totalAreaFarm: string;

  @Column()
  arableArea: string;

  @Column()
  vegetationArea: string;

  @Column()
  plantedCrops: string;
}
