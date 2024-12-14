import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { catchError, forkJoin, of, tap } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {}

  // TODO: Tweak the cron expression to run every 30 seconds
  @Cron(CronExpression.EVERY_10_SECONDS)
  checkForPendingOrders() {
    this.logger.log('Checking for pending orders...');
    this.httpService
      .get(`${this.config.get('outBox')}/orders/outbox`)
      .subscribe(
        (response) => {
          const pendingOrders = response.data;
          this.logger.log(`Found ${pendingOrders.length} pending orders.`);
          if (!pendingOrders.length) return;

          // Create an array of observables for processing orders
          const orderRequests = pendingOrders.map((order) => {
            this.logger.log(`Processing order ${order.id}...`);
            return this.httpService
              .post(`${this.config.get('delivery')}`, order)
              .pipe(
                tap((orderResponse) => {
                  this.logger.log(`Order ${order.id} processed.`);
                }),
                catchError((error) => {
                  this.logger.error(
                    `Failed to process order ${order.id}.`,
                    error,
                  );
                  return of(null); // Return a null or handle the error as appropriate
                }),
              );
          });

          // Wait for all order processing requests to complete
          forkJoin(orderRequests).subscribe((orderResponses: any[]) => {
            const successfulResponses = orderResponses
              .filter((response) => response !== null)
              .map((response) => response.data);

            if (successfulResponses.length > 0) {
              this.logger.log('Processed orders:', successfulResponses);
              this.httpService
                .post(
                  `${this.config.get('outBox')}/orders/outbox`,
                  successfulResponses,
                )
                .subscribe(
                  (status) => {
                    this.logger.log('Updated order status.');
                  },
                  (error) => {
                    this.logger.error('Failed to update order status.', error);
                  },
                );
            } else {
              this.logger.log('No orders were successfully processed.');
            }
          });
        },
        (error) => {
          this.logger.error('Failed to fetch pending orders.', error);
        },
      );
  }
}
