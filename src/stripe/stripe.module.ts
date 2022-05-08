import { Module } from '@nestjs/common';
import { StripeService } from "./stripe.service";
import { StripeController } from "./stripe.controller";
import { UserModule } from "../user/user.module";
import { TransactionModule } from "../transaction/transaction.module";
import { CardModule } from "../card/card.module";
import { OrderModule } from "../order/order.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";

@Module({
  providers: [StripeService],
  controllers: [StripeController],
  exports:[StripeService],
  imports: [UserModule, TransactionModule, CardModule, OrderModule, PrismaModule, MiddlewaresModule]
})
export class StripeModule {}
