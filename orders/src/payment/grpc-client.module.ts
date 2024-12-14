import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GrpcClientService } from './grpc-client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'payment',
          protoPath: join(__dirname, '../payment.proto'),
          url: process.env.PAYMENT || 'localhost:50051',
        },
      },
    ]),
  ],
  providers: [GrpcClientService],
  exports: [GrpcClientService],
})
export class GrpcClientsModule {}
