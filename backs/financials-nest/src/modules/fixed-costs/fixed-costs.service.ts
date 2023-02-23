import { Injectable } from "@nestjs/common";
import { CreateFixedCostDto } from "./dto/create-fixed-cost.dto";
import { UpdateFixedCostDto } from "./dto/update-fixed-cost.dto";

@Injectable()
export class FixedCostsService {
  create(createFixedCostDto: CreateFixedCostDto) {
    return "This action adds a new fixedCost";
  }

  findAll() {
    return `This action returns all fixedCosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fixedCost`;
  }

  update(id: number, updateFixedCostDto: UpdateFixedCostDto) {
    return `This action updates a #${id} fixedCost`;
  }

  remove(id: number) {
    return `This action removes a #${id} fixedCost`;
  }
}