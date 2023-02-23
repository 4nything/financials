import { Test, TestingModule } from "@nestjs/testing";
import { FixedCostsService } from "./fixed-costs.service";

describe("FixedCostsService", () => {
  let service: FixedCostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixedCostsService],
    }).compile();

    service = module.get<FixedCostsService>(FixedCostsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
