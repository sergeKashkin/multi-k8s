import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';

import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'payment',
      protoPath: join(__dirname, 'payment.proto'),
      url: '0.0.0.0:50051',
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });
  await app.listen();
}
bootstrap();
