import { Module } from "@nestjs/common";
import { IncomesService } from "./incomes.service";
import { IncomesController } from "./incomes.controller";
import { DataSource } from "typeorm";
import { Income } from "./entities/income.entity";
import { DatabaseModule } from "src/db/database.module";
import { PaymentMethod } from "@modules/payment-methods/entities/payment-method.entity";
import { User } from "@modules/users/entities/user.entity";

@Module({
  imports: [DatabaseModule],
  controllers: [IncomesController],
  providers: [
    IncomesService,
    {
      provide: "INCOME_REPOSITORY",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Income),
      inject: ["DATA_SOURCE"],
    },
    {
      provide: "PAYMENT_METHOD_REPOSITORY",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(PaymentMethod),
      inject: ["DATA_SOURCE"],
    },
    {
      provide: "USER_REPOSITORY",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ["DATA_SOURCE"],
    },
  ],
})
export class IncomesModule {}
