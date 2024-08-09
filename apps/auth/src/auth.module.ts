import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// import { HttpExceptionFilter } from "shared/shared/errors/http-exception.filter";

import {
  SharedModule,
  TypeOrmModule,
  SharedService,
} from 'shared/shared';

import { UsersService } from 'shared/shared/entities/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { APP_FILTER } from '@nestjs/core'; 

@Module({
  imports: [
    SharedModule,
    TypeOrmModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: { expiresIn: '48h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
    // {
    //   provide: APP_FILTER, 
    //   useClass: MicroExceptionFilter
    // },
  ],
})
export class AuthModule {}