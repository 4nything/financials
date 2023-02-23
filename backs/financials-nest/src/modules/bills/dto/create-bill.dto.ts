import { User } from "@models/user";
import { Currency } from "src/utils/enums/currency";

export class CreateBillDto {
  description: string;
  monto: number;
  fecha: string;
  paymentMethod: string;
  user: User;
  currency: string;
}
