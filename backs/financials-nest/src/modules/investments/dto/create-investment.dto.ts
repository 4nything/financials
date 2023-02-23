import { User } from "@models/user";

export class CreateInvestmentDto {
  id: number;
  description: string;
  monto: number;
  fecha: string;
  user: User;
  retiro: boolean;
}
