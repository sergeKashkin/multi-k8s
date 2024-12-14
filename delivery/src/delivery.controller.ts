import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { PendingOrderDto } from './models';

@Controller()
export class AppController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  createDelivery(@Body() order: PendingOrderDto): Promise<PendingOrderDto> {
    return this.deliveryService.createDelivery(order);
  }
}
