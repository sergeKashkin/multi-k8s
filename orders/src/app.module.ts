import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { GrpcClientsModule } from './payment/grpc-client.module';

@Module({
  imports: [GrpcClientsModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class AppModule {}
