import { Controller, Get, Post, Body, Param, Delete, Request, Put } from "@nestjs/common";
import { InvestmentsService } from "./investments.service";
import { CreateInvestmentDto } from "./dto/create-investment.dto";
import { UpdateInvestmentDto } from "./dto/update-investment.dto";
import { FHeaders } from "src/utils/enums/headers";

@Controller("investments")
export class InvestmentsController {
  constructor(private readonly investmentsService: InvestmentsService) {}

  @Post()
  create(@Body() createInvestmentDto: CreateInvestmentDto, @Request() request: any) {
    return this.investmentsService.create(createInvestmentDto, request.headers[FHeaders.USER_ID]);
  }

  @Get()
  findAll() {
    return this.investmentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.investmentsService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateInvestmentDto: UpdateInvestmentDto) {
    return this.investmentsService.update(+id, updateInvestmentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.investmentsService.remove(+id);
  }
}
