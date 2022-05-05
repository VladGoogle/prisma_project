import { Module } from '@nestjs/common';
import { ProductOrderDto } from "./dto/prodorder.dto";
import { ProductOrderController } from "./prodorder.controller";
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { ProductOrderService } from "./prodorder.service";
import { ProductService } from "../product/product.service";
import { ModToProdService } from "../modtoprod/modtoprod.service";
import { ModifierService } from "../modifier/modifier.service";

@Module({
  providers: [ProductOrderService, PrismaService, ErrorHandlers, ProductService, ModToProdService, ModifierService],
  controllers: [ProductOrderController],
})
export class ProdorderModule {}
