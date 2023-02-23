import { User } from "@models/user";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateSavingDto } from "./dto/create-saving.dto";
import { UpdateSavingDto } from "./dto/update-saving.dto";
import { Saving } from "./entities/saving.entity";

@Injectable()
export class SavingsService {
  constructor(
    @Inject("SAVING_REPOSITORY") private savingRepository: Repository<Saving>,
    @Inject("USER_REPOSITORY") private userRepository: Repository<User>,
  ) {}
  async create(createSavingDto: CreateSavingDto, id: string) {
    const user = await this.userRepository.findOneBy({ id });
    return this.savingRepository.save(this.savingRepository.create({ ...createSavingDto, user }));
  }

  async findAll() {
    return await this.savingRepository.find({ relations: ["user"] });
  }

  async findOne(id: number) {
    return await this.savingRepository.findOne({ where: { id }, relations: ["user"] });
  }

  async update(id: number, updateSavingDto: UpdateSavingDto) {
    try {
      const income = await this.savingRepository.findOneBy({ id });
      await this.savingRepository.update(id, updateSavingDto);
      return {
        ...income,
        ...updateSavingDto,
      };
    } catch (e) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const income = await this.savingRepository.delete({ id });
    if (!!income.affected) {
      return {
        statusCode: HttpStatus.OK,
        message: "Income deleted.",
      };
    }
    throw new HttpException("Income not found", 404);
  }
}
