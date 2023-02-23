import { User } from "@models/user";

export class CreatePaymentMethodDto {
  id: string;
  description: string;
  cardNumber: string;
  isCard: boolean;
  credit: boolean;
  user: User;
}
