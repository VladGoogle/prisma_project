import { Module } from '@nestjs/common';
import { ModToProdService } from "./modtoprod.service";
import { ModToProdController } from "./modtoprod.controller";
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { ModifierService } from "../modifier/modifier.service";
import { ProductService } from "../product/product.service";

@Module({
  providers: [ModToProdService, PrismaService, ErrorHandlers, ModifierService, ProductService],
  controllers: [ModToProdController],
  exports:[ModToProdService]
})
export class ModtoprodModule {}
