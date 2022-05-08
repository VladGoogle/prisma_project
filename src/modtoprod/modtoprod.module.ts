import { Module } from '@nestjs/common';
import { ModToProdService } from "./modtoprod.service";
import { ModToProdController } from "./modtoprod.controller";
import { PrismaModule } from "../../prisma/prisma.module";
import { ModifierModule } from "../modifier/modifier.module";
import { ProductModule } from "../product/product.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";

@Module({
  providers: [ModToProdService],
  controllers: [ModToProdController],
  exports:[ModToProdService],
  imports:[PrismaModule, MiddlewaresModule, ModifierModule, ProductModule]
})
export class ModtoprodModule {}
