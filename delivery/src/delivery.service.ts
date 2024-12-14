import { Injectable, Logger } from '@nestjs/common';
import { PendingOrderDto } from './models';

@Injectable()
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  async createDelivery(order: PendingOrderDto): Promise<PendingOrderDto> {
    this.logger.log(`Creating delivery for ${order.name} order...`);

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, 2500);
    });

    return { ...order, status: 'shipped', shippedAt: new Date() };
  }
}
