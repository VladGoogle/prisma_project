import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CardService } from "../card/card.service";
import { TransactionDto } from "../transaction/dto/transaction.dto";
import { TransactionService } from "../transaction/transaction.service";
import { UserService } from "../user/user.service";
import * as dotenv from 'dotenv'
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { OrderService } from "../order/order.service";
dotenv.config()
const stripe = new Stripe(process.env.SECRET_KEY,
  {
    apiVersion: '2020-08-27',
  });

@Injectable()
export class StripeService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers,
              private userService: UserService,
              private cardService: CardService,
              private transactionService: TransactionService,
              private orderService: OrderService)
  {}

  public async newCustomer(id:number) {
    const user = await this.userService.findUserById(id)
    await this.errorHandler.NotFoundError(user)
    const customer = await stripe.customers.create({
      name: user.firstName,
      email: user.email,
      phone:user.phone
    })
    await this.userService.setCustomerToken(customer.id , id)
    return customer;
  }


  public async newSource (cardId:number, userId: number)
  {
    const user = await this.userService.findUserById(userId)
    await this.errorHandler.NotFoundError(user)
    const card = await this.cardService.findCardById(cardId)
    await this.errorHandler.NotFoundError(card)
    const source = await stripe.customers.createSource(
      user.token,
      {source: card.externalId}
    )
    await this.cardService.setCardSource(source.id, cardId)
    return source;
  }

  public async payForOrderWithToken(data: TransactionDto){
    const order = await this.orderService.findOrder(data.orderId)
    await this.errorHandler.NotFoundError(order)
    const user= await this.userService.findUserById(data.userId)
    await this.errorHandler.NotFoundError(user)
    const card = await this.cardService.findCardById(data.cardId)
    await this.errorHandler.NotFoundError(card)
    const charge = await stripe.charges.create({
      source: card.source,
      amount: Math.round(order.totalPrice * 100),
      metadata:{
        "orderId": data.orderId
      },
      currency: data.currency,
      customer: user.token,
      description:data.description
    })
    const transactionOne = await this.transactionService.createTransaction(data)
    const transactionTwo = await this.transactionService.setChargeId(charge.id, transactionOne.id)
    return {"charge":charge, "transaction":transactionTwo};
  }

  public async createRefundForAdmin(amount: number, id:number)
  {
      const transaction = await this.transactionService.getTransactionById(id)
      await this.errorHandler.NotFoundError(transaction)
       const refund = await stripe.refunds.create({
        charge: transaction.charge,
        amount: Math.round(amount * 100)
      })

      const charge = await this.transactionService.changeTransactionAfterRefundForAdmin(refund.id,amount, id)
      return {charge, refund};
    }

  public async createRefundForCustomer(id:number)
  {
    const transaction = await this.transactionService.getTransactionById(id)
    await this.errorHandler.NotFoundError(transaction)
    const refund = await stripe.refunds.create({
      charge: transaction.charge
    })

    const charge = await this.transactionService.changeTransactionAfterRefundForCustomer(refund.id, id)
    return {charge, refund};
  }

}
