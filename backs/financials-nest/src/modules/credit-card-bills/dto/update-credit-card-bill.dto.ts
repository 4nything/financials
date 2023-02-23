import { PartialType } from "@nestjs/mapped-types";
import { CreateCreditCardBillDto } from "./create-credit-card-bill.dto";

export class UpdateCreditCardBillDto extends PartialType(CreateCreditCardBillDto) {}
