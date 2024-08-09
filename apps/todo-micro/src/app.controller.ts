import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Inject,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { HttpExceptionFilter } from 'shared/shared';
import { catchError, throwError } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}
  
  @ApiOperation({ summary: "Регистрация" })
  @ApiResponse({ status: 201, description: "Пользовательский токен" })
  @Post('auth/register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'register',
      },
      {
        name,
        email,
        password,
      })
      .pipe(catchError(error => throwError(() => new RpcException(error.response))))
  }
  
  @ApiOperation({ summary: "Аутентификация" })
  @ApiResponse({ status: 200, description: "Пользовательский токен" })
  @Post('auth/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.send(
      {
        cmd: 'login',
      },
      {
        email,
        password,
      })
    .pipe(catchError(error => throwError(() => new RpcException(error.response))))
  }
}