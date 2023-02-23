import { Test, TestingModule } from "@nestjs/testing";
import { FixedCostsController } from "./fixed-costs.controller";
import { FixedCostsService } from "./fixed-costs.service";

describe("FixedCostsController", () => {
  let controller: FixedCostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixedCostsController],
      providers: [FixedCostsService],
    }).compile();

    controller = module.get<FixedCostsController>(FixedCostsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
