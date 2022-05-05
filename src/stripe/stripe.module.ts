import { Module } from '@nestjs/common';
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { StripeService } from "./stripe.service";
import { StripeController } from "./stripe.controller";
import { RolesGuard } from "../roles/roles.guard";
import { UserService } from "../user/user.service";
import { TransactionService } from "../transaction/transaction.service";
import { CardService } from "../card/card.service";
import { OrderService } from "../order/order.service";
import { ProductOrderService } from "../prodorder/prodorder.service";
import { ModifierToProductOrderService } from "../modtoprodtoorder/modtoprodtoorder.service";
import { ModToProdService } from "../modtoprod/modtoprod.service";
import { ProductService } from "../product/product.service";
import { ModifierService } from "../modifier/modifier.service";

@Module({
  providers: [StripeService, PrismaService, ErrorHandlers, RolesGuard, UserService, TransactionService, CardService, OrderService, ProductOrderService, ModifierToProductOrderService, ModToProdService, ProductService, ModifierService],
  controllers: [StripeController],
  exports:[StripeService],
  imports: [UserService, TransactionService, CardService]
})
export class StripeModule {}
