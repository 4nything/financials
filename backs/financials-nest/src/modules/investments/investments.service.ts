import { Saving } from "@modules/savings/entities/saving.entity";
import { User } from "@modules/users/entities/user.entity";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateInvestmentDto } from "./dto/create-investment.dto";
import { UpdateInvestmentDto } from "./dto/update-investment.dto";
import { Investment } from "./entities/investment.entity";

@Injectable()
export class InvestmentsService {
  constructor(
    @Inject("INVESTMENT_REPOSITORY") private investmentRepository: Repository<Investment>,
    @Inject("USER_REPOSITORY") private userRepository: Repository<User>,
  ) {}
  async create(createInvestmentDto: CreateInvestmentDto, id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return this.investmentRepository.save(this.investmentRepository.create({ ...createInvestmentDto, user }));
  }

  async findAll() {
    return await this.investmentRepository.find({ relations: ["user"] });
  }

  async findOne(id: number) {
    return await this.investmentRepository.findOne({ where: { id }, relations: ["user"] });
  }

  async update(id: number, updateInvestmentDto: UpdateInvestmentDto) {
    try {
      const income = await this.investmentRepository.findOneBy({ id });
      await this.investmentRepository.update(id, updateInvestmentDto);
      return {
        ...income,
        ...updateInvestmentDto,
      };
    } catch (e) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const income = await this.investmentRepository.delete({ id });
    if (!!income.affected) {
      return {
        statusCode: HttpStatus.OK,
        message: "Income deleted.",
      };
    }
    throw new HttpException("Income not found", 404);
  }
}
