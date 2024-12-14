import { Controller, Inject, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall, status } from '@grpc/grpc-js';
import { ClientProxy } from '@nestjs/microservices';

import { PaymentService } from './app.service';

@Controller()
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(
    private readonly paymentService: PaymentService,
    @Inject('REDIS-PUB-SUB') private readonly client: ClientProxy,
  ) {}

  @GrpcMethod('PaymentService', 'CreatePayment')
  createPayment(
    data: { id: number; name: string },
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): any {
    this.logger.log(`Creating payment for item ${data.name}`);
    this.client.emit('payment_created', data);
    return data;
  }

  @GrpcMethod('PaymentService', 'FindOne')
  findOne(
    data: { id: number },
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): any {
    console.log('Data:', data);
    const items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];

    const item = items.find(({ id }) => id === data.id);

    if (!item) {
      // Throwing a NOT_FOUND RpcException when the item is not found
      throw new RpcException({
        code: status.NOT_FOUND, // gRPC NOT_FOUND status code
        message: `Item with id ${data.id} not found`,
      });
    }

    return item;
  }
}
