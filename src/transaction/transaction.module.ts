import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { OrderService } from "../order/order.service";
import { CardService } from "../card/card.service";
import { UserService } from "../user/user.service";
import { ProductOrderService } from "../prodorder/prodorder.service";
import { ModifierToProductOrderService } from "../modtoprodtoorder/modtoprodtoorder.service";
import { ModToProdService } from "../modtoprod/modtoprod.service";
import { ProductService } from "../product/product.service";
import { ModifierService } from "../modifier/modifier.service";
import { UserModule } from "../user/user.module";

@Module({
  providers: [TransactionService, PrismaService,ErrorHandlers,OrderService,CardService, ProductOrderService, ModifierToProductOrderService, ModToProdService, ProductOrderService, ProductService, ModifierService],
  controllers: [TransactionController],
  exports:[TransactionService],
  imports:[UserModule]
})
export class TransactionModule {
}
