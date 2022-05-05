import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { TransactionDto } from "./dto/transaction.dto";
import { UserService } from "../user/user.service";
import { CardService } from "../card/card.service";
import { OrderService } from "../order/order.service";

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers,
              @Inject(UserService) private userService: UserService,
              private cardService: CardService,
              private orderService: OrderService)
  {}

  async createTransaction(data: TransactionDto) {
    const order = await this.orderService.findOrder(data.orderId)
    const user= await this.userService.findUserById(data.userId)
    const card = await this.cardService.findCardById(data.cardId)
    return await this.prisma.transaction.create({
      data:{
        source: card.source,
        amount: order.totalPrice,
        currency: data.currency,
        description: data.description,
        customerToken: user.token,
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

  async changeTransactionAfterRefundForAdmin(refundId:string, amount: number, id:number){
    const trans = await this.getTransactionById(id)
    const transaction = await  this.prisma.transaction.update({
      where:{id:id},
      data:{
        refund:refundId,
        status: "REFUNDED",
        amount: trans.amount - amount
      }
    })
    await this.errorHandler.NotFoundError(transaction)
    return transaction;
  }

  async changeTransactionAfterRefundForCustomer(refundId:string,id:number){
    const transaction = await  this.prisma.transaction.update({
      where:{id:id},
      data:{
        refund: refundId,
        status: "REFUNDED",
        amount: 0
      }
    })
    await this.errorHandler.NotFoundError(transaction)
    return transaction;
  }

  async setChargeId(charge: string, id:number){
    const transaction = await  this.prisma.transaction.update({
      where:{id:id},
      data:{
        charge: charge
      }
    })
    await this.errorHandler.NotFoundError(transaction)
    return transaction;
  }

}
