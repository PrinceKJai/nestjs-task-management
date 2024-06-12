import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
  logger.log(`Listening on port 3000`);
  // logger.warn(`Not Listening on port 3000`);
  // logger.error(`An error occured`);
}
bootstrap();
