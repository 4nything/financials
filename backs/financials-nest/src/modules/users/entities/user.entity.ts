import { Income } from "@modules/incomes/entities/income.entity";
import { PaymentMethod } from "@modules/payment-methods/entities/payment-method.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  lastName: string;

  @Column("varchar", { unique: true })
  email: string;

  @Column("varchar")
  password: string;

  @OneToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.user)
  paymentMethods: PaymentMethod[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
