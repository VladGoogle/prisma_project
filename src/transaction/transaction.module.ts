import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { ErrorHandlers } from "../middlewares/error.handlers";
import { UserModule } from "../user/user.module";
import { CardModule } from "../card/card.module";
import { OrderModule } from "../order/order.module";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  exports:[TransactionService],
  imports:[PrismaModule, ErrorHandlers, UserModule, CardModule, OrderModule]
})
export class TransactionModule {
}
