import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskService } from './task/task.service';
import config from './config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TaskService],
})
export class AppModule {}
