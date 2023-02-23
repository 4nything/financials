import { Module } from "@nestjs/common";
import { BillsService } from "./bills.service";
import { BillsController } from "./bills.controller";
import { DataSource } from "typeorm";
import { Bill } from "./entities/bill.entity";
import { PaymentMethod } from "@modules/payment-methods/entities/payment-method.entity";
import { User } from "@modules/users/entities/user.entity";
import { DatabaseModule } from "src/db/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [BillsController],
  providers: [
    BillsService,
    {
      provide: "BILL_REPOSITORY",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Bill),
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
export class BillsModule {}
