import { HttpException, HttpStatus, Inject, Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@modules/users/entities/user.entity";
import { SignInOptions } from "@models/user";
import { environmentVars } from "src/config/config";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, @Inject("USER_REPOSITORY") private usersRepository: Repository<User>) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) throw new HttpException("User not found.", HttpStatus.BAD_REQUEST);
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(opt: SignInOptions) {
    const user = await this.usersRepository.findOneBy({ email: opt.email });
    const payload = { email: user.email, fullName: `${user.name} ${user.lastName}` };
    return {
      access_token: this.jwtService.sign(payload, { secret: environmentVars.JWT_SECRET, expiresIn: "60m" }),
    };
  }
}
