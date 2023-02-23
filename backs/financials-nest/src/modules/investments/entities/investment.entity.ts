import { PaymentMethod } from "src/modules/payment-methods/entities/payment-method.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Investment {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar")
  description: string;

  @Column("int4")
  monto: number;

  @Column("timestamp")
  fecha: string;

  @ManyToOne(() => PaymentMethod, (method) => method.id)
  method: PaymentMethod;
}
