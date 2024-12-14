import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [DeliveryService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {});
});
