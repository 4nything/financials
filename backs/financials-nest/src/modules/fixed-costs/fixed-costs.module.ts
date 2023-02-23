import { Module } from "@nestjs/common";
import { FixedCostsService } from "./fixed-costs.service";
import { FixedCostsController } from "./fixed-costs.controller";
import { DatabaseModule } from "src/db/database.module";
import { DataSource } from "typeorm";
import { FixedCost } from "./entities/fixed-cost.entity";
import { PaymentMethod } from "@modules/payment-methods/entities/payment-method.entity";
import { User } from "@modules/users/entities/user.entity";

@Module({
  imports: [DatabaseModule],
  controllers: [FixedCostsController],
  providers: [
    FixedCostsService,
    {
      provide: "FIXED_COST_REPOSITORY",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(FixedCost),
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
export class FixedCostsModule {}
