import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { IncomesService } from "./incomes.service";
import { CreateIncomeDto } from "./dto/create-income.dto";
import { UpdateIncomeDto } from "./dto/update-income.dto";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { FHeaders } from "src/utils/enums/headers";

@UseGuards(JwtAuthGuard)
@Controller("incomes")
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  create(@Body() createIncomeDto: CreateIncomeDto, @Request() request: any) {
    return this.incomesService.create(createIncomeDto, request.headers[FHeaders.USER_ID]);
  }

  @Get()
  findAll() {
    return this.incomesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.incomesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.incomesService.update(+id, updateIncomeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.incomesService.remove(+id);
  }
}
