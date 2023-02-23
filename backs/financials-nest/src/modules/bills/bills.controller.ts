import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Put } from "@nestjs/common";
import { FHeaders } from "src/utils/enums/headers";
import { BillsService } from "./bills.service";
import { CreateBillDto } from "./dto/create-bill.dto";
import { UpdateBillDto } from "./dto/update-bill.dto";

@UseGuards(JwtAuthGuard)
@Controller("bills")
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  create(@Body() createBillDto: CreateBillDto, @Request() request: any) {
    return this.billsService.create(createBillDto, request.headers[FHeaders.USER_ID]);
  }

  @Get()
  findAll() {
    return this.billsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.billsService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billsService.update(+id, updateBillDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.billsService.remove(+id);
  }
}
