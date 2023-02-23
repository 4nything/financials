import { PaymentMethod } from "src/modules/payment-methods/entities/payment-method.entity";
import { Currency } from "src/utils/enums/currency";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Bill {
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

  @Column("varchar")
  currency: Currency;
}
