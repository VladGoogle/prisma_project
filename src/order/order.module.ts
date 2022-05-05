import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { ProductOrderService } from "../prodorder/prodorder.service";
import { ModifierToProductOrderService } from "../modtoprodtoorder/modtoprodtoorder.service";
import { ModToProdService } from "../modtoprod/modtoprod.service";
import { ProductService } from "../product/product.service";
import { ModifierService } from "../modifier/modifier.service";

@Module({
  providers: [OrderService, PrismaService, ErrorHandlers, ProductOrderService, ModifierToProductOrderService, ModToProdService, ProductService, ModifierService],
  controllers: [OrderController]
})
export class OrderModule {}
