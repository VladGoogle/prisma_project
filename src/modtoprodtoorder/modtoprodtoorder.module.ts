import { Module } from '@nestjs/common';
import { ModifierToProductOrderService } from "./modtoprodtoorder.service";
import { ModToProdToOrderController } from "./modtoprodtoorder.controller";
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";
import { ModifierModule } from "../modifier/modifier.module";
import { ProdorderModule } from "../prodorder/prodorder.module";

@Module({
  controllers: [ModToProdToOrderController],
  providers: [ModifierToProductOrderService],
  exports:[ModifierToProductOrderService],
  imports:[PrismaModule, MiddlewaresModule, ModifierModule, ProdorderModule]
})
export class ModtoprodtoorderModule {}
