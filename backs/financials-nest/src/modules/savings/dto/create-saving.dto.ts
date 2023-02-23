import { User } from "@models/user";

export class CreateSavingDto {
  description: string;
  monto: number;
  fecha: string;
  retiro: boolean;
  user: User;
}
