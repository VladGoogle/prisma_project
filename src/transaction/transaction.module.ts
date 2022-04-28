import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";

@Module({
  providers: [TransactionService, PrismaService, ErrorHandlers],
  controllers: [TransactionController],
  exports:[TransactionService]
})
export class TransactionModule {
}
