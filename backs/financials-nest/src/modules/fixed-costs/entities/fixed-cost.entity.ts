import { User } from "@modules/users/entities/user.entity";
import { PaymentMethod } from "src/modules/payment-methods/entities/payment-method.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FixedCost {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar")
  description: string;

  @Column("int4")
  monto: number;

  @Column("timestamp")
  fecha: string;

  @ManyToOne(() => PaymentMethod, (method) => method.id)
  paymentMethod: PaymentMethod;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column("boolean")
  automaticDebit: boolean;
}
