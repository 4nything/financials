import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { CreditCardBillsService } from "./credit-card-bills.service";
import { CreateCreditCardBillDto } from "./dto/create-credit-card-bill.dto";
import { UpdateCreditCardBillDto } from "./dto/update-credit-card-bill.dto";

@Controller("credit-card-bills")
export class CreditCardBillsController {
  constructor(private readonly creditCardBillsService: CreditCardBillsService) {}

  @Post()
  create(@Body() createCreditCardBillDto: CreateCreditCardBillDto) {
    return this.creditCardBillsService.create(createCreditCardBillDto);
  }

  @Get()
  findAll() {
    return this.creditCardBillsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.creditCardBillsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCreditCardBillDto: UpdateCreditCardBillDto) {
    return this.creditCardBillsService.update(+id, updateCreditCardBillDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.creditCardBillsService.remove(+id);
  }
}
