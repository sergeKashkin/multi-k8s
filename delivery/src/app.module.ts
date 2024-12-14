import { Module } from '@nestjs/common';
import { AppController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DeliveryService],
})
export class AppModule {}
