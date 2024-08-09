import * as bcrypt from 'bcryptjs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'shared/shared/entities/users/dto/create-user.dto';
import { UsersService } from 'shared/shared/entities/users/users.service';
import { UserEntity } from 'shared/shared/entities/users/users.entity';
import { SignInUserDto } from 'shared/shared/entities/users/dto/sign-in-user.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userDto: SignInUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const applicant = await this.usersService.findUserByEmail(userDto.email);
    // console.debug('existing user:', applicant)
    if (applicant) {
      const errors = 'An account with such email already exists!'
      throw new RpcException(
        new BadRequestException(errors)
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: UserEntity) {
    const payload = { id: user.id, email: user.email, name: user.name };
    // console.debug(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: SignInUserDto) {
    const user = await this.usersService.findUserByEmail(userDto.email);
    if (!user || !user.password || !userDto.password) {
      throw new RpcException(
        new NotFoundException("Invalid credentials")
    );

    }
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEqual) {
      return user;
    }
    
    throw new RpcException(
      new NotFoundException("Invalid credentials")
    );
  }
}

