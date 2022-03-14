import {
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { AuthGuard } from "@nestjs/passport";

@Controller()
@UseGuards(AuthGuard('jwt'))
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('transactions/:id')
  async getTransactionById(@Param('id') id: string) {
    const transactionId = parseInt(id);
    return await this.transactionService.getTransactionById(transactionId)
  }

  @Get('transactions')
  async  getAllTransactions(){
    return await this.transactionService.getTransactions()
  }

  @Delete('transactions/:id')
  async deleteTransaction(@Param('id') id: string){
    const transactionId = parseInt(id);
    return await this.transactionService.deleteTransaction(transactionId)
  }
}
