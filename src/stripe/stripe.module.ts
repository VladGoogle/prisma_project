import { Module } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { StripeService } from "./stripe.service";
import { StripeController } from "./stripe.controller";
import { RolesGuard } from "../roles/roles.guard";
import { UserService } from "../user/user.service";
import { TransactionService } from "../transaction/transaction.service";
import { CardService } from "../card/card.service";

@Module({
  providers: [StripeService, PrismaService, ErrorHandlers, RolesGuard, UserService, TransactionService, CardService],
  controllers: [StripeController],
  imports: [UserService, TransactionService, CardService]
})
export class StripeModule {}
