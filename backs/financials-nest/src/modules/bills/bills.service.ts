import { PaymentMethod } from "@modules/payment-methods/entities/payment-method.entity";
import { User } from "@modules/users/entities/user.entity";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateBillDto } from "./dto/create-bill.dto";
import { UpdateBillDto } from "./dto/update-bill.dto";
import { Bill } from "./entities/bill.entity";

@Injectable()
export class BillsService {
  constructor(
    @Inject("BILL_REPOSITORY") private billRepository: Repository<Bill>,
    @Inject("PAYMENT_METHOD_REPOSITORY") private paymentMethodRepository: Repository<PaymentMethod>,
    @Inject("USER_REPOSITORY") private userRepository: Repository<User>,
  ) {}
  async create(createBillDto: CreateBillDto, id: string) {
    const user = await this.userRepository.findOneBy({ id });
    const paymentMethod = await this.paymentMethodRepository.findOneBy({
      id: createBillDto.paymentMethod,
    });
    return await this.billRepository.save(this.billRepository.create({ ...createBillDto, paymentMethod, user }));
  }

  async findAll() {
    return await this.billRepository.find({ relations: ["user", "paymentMethod"] });
  }

  async findOne(id: number) {
    return await this.billRepository.findOne({ where: { id }, relations: ["user", "paymentMethod"] });
  }

  async update(id: number, updateBillDto: UpdateBillDto) {
    try {
      const bill = await this.billRepository.findOneBy({ id });
      const method = await this.paymentMethodRepository.findOneBy({ id: updateBillDto.paymentMethod });
      await this.billRepository.update(id, { ...updateBillDto, paymentMethod: method });
      return {
        ...bill,
        ...updateBillDto,
      };
    } catch (e) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const bill = await this.billRepository.delete({ id });
    if (!!bill.affected) {
      return {
        statusCode: HttpStatus.OK,
        message: "Bill deleted.",
      };
    }
    throw new HttpException("Bill not found", 404);
  }
}
