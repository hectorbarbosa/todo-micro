import { TypeOrmModule } from 'shared/shared/typeorm.module';
import { Module } from '@nestjs/common';
import { UsersModule } from 'shared/shared/entities/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from 'shared/shared/entities/projects/projects.module';
import { ListsModule } from 'shared/shared/entities/lists/lists.module';
import { TasksModule } from 'shared/shared/entities/tasks/tasks.module';
import { SharedModule, UserEntity } from 'shared/shared';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule,
    UsersModule,
    ProjectsModule,
    ListsModule,
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SharedModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
  ],
  controllers: [AppController],
})
export class AppModule {}
