import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { UserModule } from "../user/user.module";
import { CardModule } from "../card/card.module";
import { OrderModule } from "../order/order.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  exports:[TransactionService],
  imports:[PrismaModule, MiddlewaresModule, UserModule, CardModule, OrderModule]
})
export class TransactionModule {
}
