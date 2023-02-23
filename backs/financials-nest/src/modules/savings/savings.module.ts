import { Module } from "@nestjs/common";
import { SavingsService } from "./savings.service";
import { SavingsController } from "./savings.controller";
import { Saving } from "./entities/saving.entity";
import { DataSource } from "typeorm";
import { User } from "@modules/users/entities/user.entity";
import { DatabaseModule } from "src/db/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [SavingsController],
  providers: [
    SavingsService,
    {
      provide: "SAVING_REPOSITORY",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Saving),
      inject: ["DATA_SOURCE"],
    },
    {
      provide: "USER_REPOSITORY",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ["DATA_SOURCE"],
    },
  ],
})
export class SavingsModule {}
