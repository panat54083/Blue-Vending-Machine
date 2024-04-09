import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CoinBanknote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column()
  type: 'BANKNOTE' | 'COIN'

  @Column()
  stock: number;
}
