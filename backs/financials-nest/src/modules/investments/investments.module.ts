import { Module } from "@nestjs/common";
import { InvestmentsService } from "./investments.service";
import { InvestmentsController } from "./investments.controller";
import { DataSource } from "typeorm";
import { DatabaseModule } from "src/db/database.module";
import { User } from "@modules/users/entities/user.entity";
import { Investment } from "./entities/investment.entity";

@Module({
  imports: [DatabaseModule],
  controllers: [InvestmentsController],
  providers: [
    InvestmentsService,
    {
      provide: "INVESTMENT_REPOSITORY",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Investment),
      inject: ["DATA_SOURCE"],
    },
    {
      provide: "USER_REPOSITORY",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ["DATA_SOURCE"],
    },
  ],
})
export class InvestmentsModule {}
