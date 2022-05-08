import { Module } from '@nestjs/common';
import { ProductOrderController } from "./prodorder.controller";
import { ProductOrderService } from "./prodorder.service";
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";
import { ProductModule } from "../product/product.module";
import { ModtoprodModule } from "../modtoprod/modtoprod.module";

@Module({
  providers: [ProductOrderService],
  controllers: [ProductOrderController],
  exports:[ProductOrderService],
  imports:[PrismaModule, MiddlewaresModule, ProductModule, ModtoprodModule]
})
export class ProdorderModule {}
