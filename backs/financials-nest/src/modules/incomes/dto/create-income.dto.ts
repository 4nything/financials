import { User } from "@models/user";

export class CreateIncomeDto {
  description: string;
  monto: number;
  fecha: string;
  paymentMethod: string;
  user: User;
}
