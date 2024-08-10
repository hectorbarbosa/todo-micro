import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Inject,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto'; 
import { SignInUserDto } from './dto/sign-in-user.dto'; 

@ApiTags('Регистрация и аутентификация')
@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}
  
  @ApiOperation({ summary: "Регистрация" })
  @ApiResponse({ status: 201, description: "Пользовательский токен" })
  @Post('auth/register')
  async register(@Body() userDto: CreateUserDto) {
    return this.authService.send(
      {
        cmd: 'register',
      },
      userDto
    )
    .pipe(catchError(error => throwError(() => new RpcException(error.response))))
  }
  
  @ApiOperation({ summary: "Аутентификация" })
  @ApiResponse({ status: 200, description: "Пользовательский токен" })
  @Post('auth/login')
  async login(@Body() userDto: SignInUserDto) {
    return this.authService.send(
      {
        cmd: 'login',
      },
      userDto
    )
    .pipe(catchError(error => throwError(() => new RpcException(error.response))))
  }
}