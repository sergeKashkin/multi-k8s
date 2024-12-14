import { Inject, Injectable, Logger } from '@nestjs/common';
import { OrderDto, OrderOutBoxDto } from './models';
import { GrpcClientService } from './payment/grpc-client.service';

type Order = {
  id: number;
  name: string;
  status: 'pending' | 'shipped';
  createdAt?: Date;
  shippedAt?: Date;
};

type OrderOutBox = Order & { createdAt: Date; shippedAt?: Date };

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(private readonly grpcClientService: GrpcClientService) {}

  orders: Order[] = [
    { id: 1, name: 'Order 1', status: 'pending' },
    { id: 2, name: 'Order 2', status: 'shipped' },
  ];

  ordersOutBox: OrderOutBox[] = [];

  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: number): Order {
    return this.orders.find((order) => order.id === id);
  }

  async createOrder(order: OrderDto): Promise<Order> {
    const newOrder = {
      id: this.orders.length + 1,
      name: order.name,
      status: 'pending' as Order['status'],
    };

    const payment = await this.grpcClientService.createPayment({
      id: newOrder.id,
      name: newOrder.name,
    });
    this.logger.log(`Payment for order ${newOrder.name} created.`);

    this.orders.push(newOrder as Order);
    this.ordersOutBox.push({ ...newOrder, createdAt: new Date() });
    this.logger.log(`Order ${newOrder.name} created.`);
    return newOrder as Order;
  }

  getOrdersOutBox(): OrderOutBox[] {
    return this.ordersOutBox.filter((order) => order.status === 'pending');
  }

  updateOrdersOutBox(orders: OrderOutBoxDto[]): void {
    this.logger.log('Updating orders outbox...');
    orders.forEach((order) => {
      const index = this.ordersOutBox.findIndex((o) => o.id === order.id);
      const orderIndex = this.orders.findIndex((o) => o.id === order.id);

      this.orders[orderIndex] = order;
      this.ordersOutBox[index] = order;
      this.logger.log(`Order ${order.name} updated.`);
    });
  }
}
