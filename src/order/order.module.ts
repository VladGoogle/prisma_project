import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProdorderModule } from "../prodorder/prodorder.module";
import { ModtoprodtoorderModule } from "../modtoprodtoorder/modtoprodtoorder.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  exports:[OrderService],
  imports:[ProdorderModule, ModtoprodtoorderModule, PrismaModule, MiddlewaresModule]
})
export class OrderModule {}
