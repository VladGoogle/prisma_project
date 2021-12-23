import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma.servise';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.SERVER_PORT);
  console.log(`Server is listening on port ${process.env.SERVER_PORT}`);
}
bootstrap();
