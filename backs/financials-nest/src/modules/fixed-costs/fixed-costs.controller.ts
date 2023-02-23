import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { FixedCostsService } from "./fixed-costs.service";
import { CreateFixedCostDto } from "./dto/create-fixed-cost.dto";
import { UpdateFixedCostDto } from "./dto/update-fixed-cost.dto";

@Controller("fixed-costs")
export class FixedCostsController {
  constructor(private readonly fixedCostsService: FixedCostsService) {}

  @Post()
  create(@Body() createFixedCostDto: CreateFixedCostDto) {
    return this.fixedCostsService.create(createFixedCostDto);
  }

  @Get()
  findAll() {
    return this.fixedCostsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fixedCostsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFixedCostDto: UpdateFixedCostDto) {
    return this.fixedCostsService.update(+id, updateFixedCostDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.fixedCostsService.remove(+id);
  }
}
