import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificationService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [NotificationService],
})
export class AppModule {}
