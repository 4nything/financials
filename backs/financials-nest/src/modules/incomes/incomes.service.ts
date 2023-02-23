import { User } from "@models/user";
import { PaymentMethod } from "@modules/payment-methods/entities/payment-method.entity";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateIncomeDto } from "./dto/create-income.dto";
import { UpdateIncomeDto } from "./dto/update-income.dto";
import { Income } from "./entities/income.entity";

@Injectable()
export class IncomesService {
  constructor(
    @Inject("INCOME_REPOSITORY") private incomeRepository: Repository<Income>,
    @Inject("USER_REPOSITORY") private userRepository: Repository<User>,
    @Inject("PAYMENT_METHOD_REPOSITORY") private paymentRepository: Repository<PaymentMethod>,
  ) {}

  async create(createIncomeDto: CreateIncomeDto, id: string) {
    const user = await this.userRepository.findOneBy({ id });
    const paymentMethod = await this.paymentRepository.findOneBy({ id: createIncomeDto.paymentMethod });
    return this.incomeRepository.save(this.incomeRepository.create({ ...createIncomeDto, paymentMethod, user }));
  }

  async findAll() {
    return await this.incomeRepository.find({ relations: ["user", "paymentMethod"] });
  }

  async findOne(id: number) {
    return await this.incomeRepository.findOne({ where: { id }, relations: ["user", "paymentMethod"] });
  }

  async update(id: number, updateIncomeDto: UpdateIncomeDto) {
    try {
      const income = await this.incomeRepository.findOneBy({ id });
      const method = await this.paymentRepository.findOneBy({ id: updateIncomeDto.paymentMethod });
      await this.incomeRepository.update(id, { ...updateIncomeDto, paymentMethod: method });
      return {
        ...income,
        ...updateIncomeDto,
      };
    } catch (e) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const income = await this.incomeRepository.delete({ id });
    if (!!income.affected) {
      return {
        statusCode: HttpStatus.OK,
        message: "Income deleted.",
      };
    }
    throw new HttpException("Income not found", 404);
  }
}
