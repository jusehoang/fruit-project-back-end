import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './@core/exceptions/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
