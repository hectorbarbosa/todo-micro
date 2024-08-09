import { Controller, Inject, UseFilters } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { SharedService } from 'shared/shared';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('SharedServiceInterface')
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'register' })
  async register(@Ctx() context: RmqContext, @Payload() newUser: CreateUserDto) {
    this.sharedService.acknowledgeMessage(context);

    return await this.authService.registration(newUser);
  }

  @MessagePattern({ cmd: 'login' })
  async login(
    @Ctx() context: RmqContext,
    @Payload() existingUser: SignInUserDto,
  ) {
    this.sharedService.acknowledgeMessage(context);
    
    return await this.authService.signIn(existingUser);
  }
}