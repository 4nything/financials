import { DataSource } from "typeorm";
import { PaymentMethod } from "@modules/payment-methods/entities/payment-method.entity";
import { Bill } from "@modules/bills/entities/bill.entity";
import { CreditCard } from "@modules/credit-cards/entities/credit-card.entity";
import { CreditCardBill } from "@modules/credit-card-bills/entities/credit-card-bill.entity";
import { FixedCost } from "@modules/fixed-costs/entities/fixed-cost.entity";
import { Income } from "@modules/incomes/entities/income.entity";
import { Investment } from "@modules/investments/entities/investment.entity";
import { Saving } from "@modules/savings/entities/saving.entity";
import { User } from "@modules/users/entities/user.entity";

const entities = [PaymentMethod, Bill, CreditCard, CreditCardBill, FixedCost, Income, Investment, Saving, User];
export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: "postgres",
        entities: entities,
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
