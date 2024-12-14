import { Controller, Get, Logger } from '@nestjs/common';
import { NotificationService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: NotificationService) {}

  @MessagePattern('payment_created')
  getNotifications(
    @Payload() data: { id: number; name: string },
    @Ctx() context: RedisContext,
  ) {
    this.logger.log(
      `Notifying user of successful payment created event with data: ${data.name}`,
    );
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
