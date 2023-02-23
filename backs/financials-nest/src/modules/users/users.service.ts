import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@Inject("USER_REPOSITORY") private usersRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneBy({ email: createUserDto.email });
    if (user) {
      throw new HttpException("User already exists.", HttpStatus.CONFLICT);
    }
    const userDto = this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.genSalt(10).then((salt) => bcrypt.hash(createUserDto.password, salt)),
    });
    const response = await this.usersRepository.save(userDto);
    return response;
  }

  async findAll() {
    return await this.usersRepository.find({ relations: ["paymentMethods"] });
  }

  async findOne(id: string) {
    return await this.usersRepository.find({ relations: ["paymentMethods"], where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.genSalt(10).then((salt) => bcrypt.hash(updateUserDto.password, salt));
      }
      const user = await this.usersRepository.findOneBy({ id });
      await this.usersRepository.update(id, updateUserDto);
      return {
        ...user,
        ...updateUserDto,
      };
    } catch (e) {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.usersRepository.delete({ id });
      if (!!user.affected) {
        return {
          statusCode: HttpStatus.OK,
          message: "User deleted.",
        };
      } else {
        throw new HttpException("", HttpStatus.NOT_MODIFIED);
      }
    } catch {
      throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
    }
  }
}
