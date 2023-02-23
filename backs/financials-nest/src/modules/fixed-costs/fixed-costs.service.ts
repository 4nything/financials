import { PaymentMethod } from "@modules/payment-methods/entities/payment-method.entity";
import { User } from "@modules/users/entities/user.entity";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateFixedCostDto } from "./dto/create-fixed-cost.dto";
import { UpdateFixedCostDto } from "./dto/update-fixed-cost.dto";
import { FixedCost } from "./entities/fixed-cost.entity";

@Injectable()
export class FixedCostsService {
  constructor(
    @Inject("FIXED_COST_REPOSITORY") private fixedCostRepository: Repository<FixedCost>,
    @Inject("PAYMENT_METHOD_REPOSITORY") private paymentMethodRepository: Repository<PaymentMethod>,
    @Inject("USER_REPOSITORY") private userRepository: Repository<User>,
  ) {}
  async create(createFixedCostDto: CreateFixedCostDto, id: string) {
    const user = await this.userRepository.findOneBy({ id });
    const paymentMethod = await this.paymentMethodRepository.findOneBy({
      id: createFixedCostDto.paymentMethod,
    });
    return await this.fixedCostRepository.save(this.fixedCostRepository.create({ ...createFixedCostDto, paymentMethod, user }));
  }

  async findAll() {
    return await this.fixedCostRepository.find({ relations: ["user", "paymentMethod"] });
  }

  async findOne(id: number) {
    return await this.fixedCostRepository.findOne({ where: { id }, relations: ["user", "paymentMethod"] });
  }

  async update(id: number, updateFixedCostDto: UpdateFixedCostDto) {
    try {
      const fixedCost = await this.fixedCostRepository.findOneBy({ id });
      const method = await this.paymentMethodRepository.findOneBy({ id: updateFixedCostDto.paymentMethod });
      await this.fixedCostRepository.update(id, { ...updateFixedCostDto, paymentMethod: method });
      return {
        ...fixedCost,
        ...updateFixedCostDto,
      };
    } catch (e) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const fixedCost = await this.fixedCostRepository.delete({ id });
    if (!!fixedCost.affected) {
      return {
        statusCode: HttpStatus.OK,
        message: "Fixed cost deleted.",
      };
    }
    throw new HttpException("Fixed cost not found", 404);
  }
}
