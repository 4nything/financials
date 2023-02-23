import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/db/database.module";
import { AuthModule } from "./auth/auth.module";
import { BillsModule } from "./bills/bills.module";
import { CreditCardBillsModule } from "./credit-card-bills/credit-card-bills.module";
import { CreditCardsModule } from "./credit-cards/credit-cards.module";
import { FixedCostsModule } from "./fixed-costs/fixed-costs.module";
import { IncomesModule } from "./incomes/incomes.module";
import { InvestmentsModule } from "./investments/investments.module";
import { PaymentMethodsModule } from "./payment-methods/payment-methods.module";
import { SavingsModule } from "./savings/savings.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    BillsModule,
    CreditCardsModule,
    CreditCardBillsModule,
    IncomesModule,
    InvestmentsModule,
    SavingsModule,
    PaymentMethodsModule,
    FixedCostsModule,
    AuthModule,
    UsersModule,
  ],
})
export class BaseModules {}
