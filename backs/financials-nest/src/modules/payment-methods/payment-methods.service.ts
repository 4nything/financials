import { User } from "@models/user";
import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { IsNull, Repository } from "typeorm";
import { CreatePaymentMethodDto } from "./dto/create-payment-method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";
import { PaymentMethod } from "./entities/payment-method.entity";

@Injectable()
export class PaymentMethodsService {
  constructor(
    @Inject("PAYMENT_METHOD_REPOSITORY") private paymentMethodRepository: Repository<PaymentMethod>,
    @Inject("USER_REPOSITORY") private userRepository: Repository<User>,
  ) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto, id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      createPaymentMethodDto = {
        ...createPaymentMethodDto,
        cardNumber: createPaymentMethodDto.cardNumber ? "*".repeat(12) + createPaymentMethodDto.cardNumber : null,
        user,
        credit: createPaymentMethodDto.credit || false,
      };
      const methodDto = this.paymentMethodRepository.create(createPaymentMethodDto);
      const method = this.paymentMethodRepository.save(methodDto);
      return method;
    }

    throw new HttpException("User is required", HttpStatus.BAD_REQUEST);
  }

  async findAll(user: string) {
    const commonMethods = await this.paymentMethodRepository.find({ where: { user: IsNull() } });
    const userMethods = await this.paymentMethodRepository.find({ where: { user: { id: user } }, relations: ["user"] });
    return [...commonMethods, ...userMethods];
  }

  async findOne(id: string) {
    return await this.paymentMethodRepository.findOneBy({ id });
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    try {
      const method = await this.paymentMethodRepository.findOneBy({ id });
      await this.paymentMethodRepository.update(id, updatePaymentMethodDto);
      return {
        ...method,
        ...updatePaymentMethodDto,
      };
    } catch (e) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const method = await this.paymentMethodRepository.delete({ id });
      if (!!method.affected) {
        return {
          statusCode: HttpStatus.OK,
          message: "Payment method deleted.",
        };
      } else {
        throw new HttpException("", HttpStatus.NOT_MODIFIED);
      }
    } catch {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }
}
