import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CoinBanknote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  denomination: number;

  @Column()
  stock: number;
}
