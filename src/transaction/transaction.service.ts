import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { TransactionDto } from "./dto/transaction.dto";
import { RefundDto } from "./dto/refund.dto";
import { ChargeStatus } from "../enums/ChargeStatus.enum";

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers)
  {}

  async createTransaction(data: TransactionDto) {
    return await this.prisma.transaction.create({
      data:{
        source: data.source,
        amount: data.amount,
        status: data.status,
        currency: data.currency,
        description: data.description,
        customerToken: data.token,
        orderId: data.orderId,
        cardId: data.cardId
      }
    })
  }

  async getTransactionById(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where:{id:id},
      include:{
        order: true,
        card: true
      }
    })
    await this.errorHandler.NotFoundError(transaction)
    return transaction
  }

  async getTransactions() {
    return await this.prisma.transaction.findMany({
      include: {
        order: true,
        card: true
      }
    })
  }

  async deleteTransaction(id: number){
    return await this.prisma.transaction.findUnique({
      where:{id:id},
      include:{
        order: true,
        card: true
      }
    })
  }

  async changeTransactionAfterRefundForAdmin(data: RefundDto, id:number){
    const transaction = await  this.prisma.transaction.update({
      where:{id:id},
      data:{
        status: data.status,
        amount: data.amount
      }
    })
    await this.errorHandler.NotFoundError(transaction)
    return transaction;
  }

  async changeTransactionAfterRefundForCustomer(data: RefundDto, id:number){
    const transaction = await  this.prisma.transaction.update({
      where:{id:id},
      data:{
        status: data.status
      }
    })
    await this.errorHandler.NotFoundError(transaction)
    return transaction;
  }
}
