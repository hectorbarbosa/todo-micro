import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { ListEntity } from './lists.entity';
import { ProjectEntity } from 'shared/shared/entities/projects/projects.entity';
import { ProjectsModule } from 'shared/shared/entities/projects/projects.module';
import { ProjectsService } from 'shared/shared/entities/projects/projects.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    ProjectsModule,
    TypeOrmModule.forFeature([ListEntity, ProjectEntity]),
  ],
  providers: [ListsService, ProjectsService],
  controllers: [ListsController],
})
export class ListsModule {}
