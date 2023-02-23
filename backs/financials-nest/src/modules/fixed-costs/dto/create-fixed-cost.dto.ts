import { User } from "@models/user";

export class CreateFixedCostDto {
  description: string;
  monto: number;
  fecha: string;
  paymentMethod: string;
  user: User;
}
