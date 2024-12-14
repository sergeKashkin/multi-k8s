export class PendingOrderDto {
  id: number;
  name: string;
  status: 'pending' | 'shipped';
  createdAt: Date;
  shippedAt?: Date;
}
