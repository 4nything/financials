import { Test, TestingModule } from "@nestjs/testing";
import { CreditCardBillsController } from "./credit-card-bills.controller";
import { CreditCardBillsService } from "./credit-card-bills.service";

describe("CreditCardBillsController", () => {
  let controller: CreditCardBillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardBillsController],
      providers: [CreditCardBillsService],
    }).compile();

    controller = module.get<CreditCardBillsController>(CreditCardBillsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
