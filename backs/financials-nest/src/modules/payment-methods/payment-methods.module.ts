import { Module } from "@nestjs/common";
import { PaymentMethodsService } from "./payment-methods.service";
import { PaymentMethodsController } from "./payment-methods.controller";
import { DataSource } from "typeorm";
import { PaymentMethod } from "./entities/payment-method.entity";
import { DatabaseModule } from "src/db/database.module";
import { User } from "@modules/users/entities/user.entity";

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentMethodsController],
  providers: [
    PaymentMethodsService,
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
export class PaymentMethodsModule {}
