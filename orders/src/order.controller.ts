import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, OrderOutBoxDto } from './models';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/orders')
  getOrders(): ReturnType<OrderService['getOrders']> {
    return this.orderService.getOrders();
  }

  @Get('/orders/outbox')
  getOrdersOutBox(): ReturnType<OrderService['getOrdersOutBox']> {
    return this.orderService.getOrdersOutBox();
  }

  @Post('/orders/outbox')
  @ApiBody({ type: [OrderOutBoxDto] })
  @ApiOperation({ summary: 'Updates order status' })
  @ApiResponse({ status: 200, description: 'Order status updated' })
  updateOrderStatus(
    @Body() orders: OrderOutBoxDto[],
  ): ReturnType<OrderService['updateOrdersOutBox']> {
    return this.orderService.updateOrdersOutBox(orders);
  }

  @Get('/orders/:id')
  getOrderById(
    @Param('id', ParseIntPipe) id: number,
  ): ReturnType<OrderService['getOrderById']> {
    const order = this.orderService.getOrderById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.orderService.getOrderById(id);
  }

  @Post('/orders')
  @ApiBody({ type: OrderDto })
  @ApiOperation({ summary: 'Creates new order' })
  createOrder(
    @Body() order: OrderDto,
  ): ReturnType<OrderService['createOrder']> {
    return this.orderService.createOrder(order);
  }
}
