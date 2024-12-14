import { Module } from '@nestjs/common';
import { PaymentController } from './app.controller';
import { PaymentService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS-PUB-SUB',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'localhost',
          port: Number(process.env.REDIS_PORT) || 6379,
        },
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class AppModule {}
