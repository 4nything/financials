import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put } from "@nestjs/common";
import { FixedCostsService } from "./fixed-costs.service";
import { CreateFixedCostDto } from "./dto/create-fixed-cost.dto";
import { UpdateFixedCostDto } from "./dto/update-fixed-cost.dto";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { FHeaders } from "src/utils/enums/headers";

@UseGuards(JwtAuthGuard)
@Controller("fixed-costs")
export class FixedCostsController {
  constructor(private readonly fixedCostsService: FixedCostsService) {}

  @Post()
  create(@Body() createFixedCostDto: CreateFixedCostDto, @Request() request: any) {
    return this.fixedCostsService.create(createFixedCostDto, request.headers[FHeaders.USER_ID]);
  }

  @Get()
  findAll() {
    return this.fixedCostsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.fixedCostsService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateFixedCostDto: UpdateFixedCostDto) {
    return this.fixedCostsService.update(+id, updateFixedCostDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.fixedCostsService.remove(+id);
  }
}
