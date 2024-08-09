import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskEntity } from './tasks.entity';
import { ListEntity } from 'shared/shared/entities/lists/lists.entity';
import { ListsModule } from 'shared/shared/entities/lists/lists.module';
import { ListsService } from 'shared/shared/entities/lists/lists.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    ListsModule,
    TypeOrmModule.forFeature([TaskEntity, ListEntity]),
  ],
  providers: [TasksService, ListsService],
  controllers: [TasksController],
})
export class TasksModule {}
