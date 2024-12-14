import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

interface PaymentService {
  findOne(data: { id: number }): any;
  createPayment(data: { id: number; name: string }): any;
}

@Injectable()
export class GrpcClientService implements PaymentService {
  private paymentService: PaymentService;

  constructor(@Inject('PAYMENT_PACKAGE') private client: ClientGrpc) {
    this.paymentService =
      this.client.getService<PaymentService>('PaymentService');
  }

  async findOne(data: { id: number }): Promise<any> {
    const findOneObservable = this.paymentService.findOne(data);
    return await lastValueFrom(findOneObservable);
  }

  async createPayment(data: { id: number; name: string }): Promise<any> {
    const createPaymentObservable = this.paymentService.createPayment(data);
    return await lastValueFrom(createPaymentObservable);
  }
}
