import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put } from "@nestjs/common";
import { PaymentMethodsService } from "./payment-methods.service";
import { CreatePaymentMethodDto } from "./dto/create-payment-method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";
import { JwtAuthGuard } from "@modules/auth/guards/jwt-auth.guard";
import { FHeaders } from "src/utils/enums/headers";

@UseGuards(JwtAuthGuard)
@Controller("payment-methods")
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto, @Request() request: any) {
    return this.paymentMethodsService.create(createPaymentMethodDto, request.headers[FHeaders.USER_ID]);
  }

  @Get()
  findAll(@Request() request: any) {
    return this.paymentMethodsService.findAll(request.headers[FHeaders.USER_ID]);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentMethodsService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodsService.update(id, updatePaymentMethodDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentMethodsService.remove(id);
  }
}
