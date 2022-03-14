import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from "../prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";

@Module({
  providers: [OrderService, PrismaService, ErrorHandlers],
  controllers: [OrderController]
})
export class OrderModule {}
