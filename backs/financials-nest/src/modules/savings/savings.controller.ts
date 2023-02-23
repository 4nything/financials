import { Controller, Get, Post, Body, Param, Delete, Request, Put } from "@nestjs/common";
import { SavingsService } from "./savings.service";
import { CreateSavingDto } from "./dto/create-saving.dto";
import { UpdateSavingDto } from "./dto/update-saving.dto";
import { FHeaders } from "src/utils/enums/headers";

@Controller("savings")
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @Post()
  create(@Body() createSavingDto: CreateSavingDto, @Request() request: Request) {
    return this.savingsService.create(createSavingDto, request.headers[FHeaders.USER_ID]);
  }

  @Get()
  findAll() {
    return this.savingsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.savingsService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateSavingDto: UpdateSavingDto) {
    return this.savingsService.update(+id, updateSavingDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.savingsService.remove(+id);
  }
}
