import { Module } from '@nestjs/common';
import { ModifierToProductOrderService } from "./modtoprodtoorder.service";
import { ModToProdToOrderController } from "./modtoprodtoorder.controller";
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { ModifierService } from "../modifier/modifier.service";
import { ProductOrderService } from "../prodorder/prodorder.service";
import { ModToProdService } from "../modtoprod/modtoprod.service";
import { ProductService } from "../product/product.service";
import { OrderService } from "../order/order.service";

@Module({
  controllers: [ModToProdToOrderController],
  providers: [ModifierToProductOrderService, PrismaService, ErrorHandlers, ModifierService, ProductOrderService, ModToProdService, ProductService, OrderService],
  exports:[ModifierToProductOrderService]
})
export class ModtoprodtoorderModule {}
