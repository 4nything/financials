import { Module } from "@nestjs/common";
import { CreditCardBillsService } from "./credit-card-bills.service";
import { CreditCardBillsController } from "./credit-card-bills.controller";

@Module({
  controllers: [CreditCardBillsController],
  providers: [CreditCardBillsService],
})
export class CreditCardBillsModule {}
