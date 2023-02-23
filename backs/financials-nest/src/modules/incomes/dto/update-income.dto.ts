import { User } from "@models/user";
import { PaymentMethod } from "@modules/payment-methods/entities/payment-method.entity";
import { PartialType } from "@nestjs/mapped-types";
import { CreateIncomeDto } from "./create-income.dto";

export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {
  id: number;
}
