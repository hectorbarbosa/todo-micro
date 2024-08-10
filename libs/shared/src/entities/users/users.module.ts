import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { ProjectEntity } from 'shared/shared';
import { JwtModule } from '@nestjs/jwt';
import { ProjectsModule } from 'shared/shared/entities/projects/projects.module';
import { ProjectsService } from 'shared/shared/entities/projects/projects.service';

@Module({
  imports: [
    JwtModule,
    ProjectsModule,
    TypeOrmModule.forFeature([ProjectEntity, UserEntity]),
  ],
  providers: [UsersService, ProjectsService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
