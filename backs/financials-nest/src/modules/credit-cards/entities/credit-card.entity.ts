import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreditCard {
  @PrimaryGeneratedColumn("increment")
  id: number;
}
