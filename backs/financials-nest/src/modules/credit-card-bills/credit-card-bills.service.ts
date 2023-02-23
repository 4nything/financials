import { Injectable } from "@nestjs/common";
import { CreateCreditCardBillDto } from "./dto/create-credit-card-bill.dto";
import { UpdateCreditCardBillDto } from "./dto/update-credit-card-bill.dto";

@Injectable()
export class CreditCardBillsService {
  create(createCreditCardBillDto: CreateCreditCardBillDto) {
    return "This action adds a new creditCardBill";
  }

  findAll() {
    return `This action returns all creditCardBills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} creditCardBill`;
  }

  update(id: number, updateCreditCardBillDto: UpdateCreditCardBillDto) {
    return `This action updates a #${id} creditCardBill`;
  }

  remove(id: number) {
    return `This action removes a #${id} creditCardBill`;
  }
}
