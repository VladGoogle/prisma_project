import { Module } from '@nestjs/common';
import { ProductOrderDto } from "./dto/prodorder.dto";
import { ProductOrderController } from "./prodorder.controller";
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { ProductOrderService } from "./prodorder.service";

@Module({
  providers: [ProductOrderService, PrismaService, ErrorHandlers],
  controllers: [ProductOrderController],

})
export class ProdorderModule {}
