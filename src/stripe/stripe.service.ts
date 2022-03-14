import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CardService } from "../card/card.service";
import { TransactionDto } from "../transaction/dto/transaction.dto";
import { RefundDto } from "../transaction/dto/refund.dto";
import { TransactionService } from "../transaction/transaction.service";
import { UserService } from "../user/user.service";
import * as dotenv from 'dotenv'
import { PrismaService } from "../prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
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
              private transactionService: TransactionService)
  {}

  public async newCustomer(id:number) {
    const user = await this.userService.findUserById(id)
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
    const card = await this.cardService.findCardById(cardId)
    const source = await stripe.customers.createSource(
      user.token,
      {source: card.externalId}
    )
    return source;
  }

  public async payForOrderWithToken(data: TransactionDto){
    await stripe.charges.create({
      source: data.source,
      amount: data.amount,
      currency: data.currency,
      customer: data.token,
      description:data.description
    }).then(console.log)
    const transaction = await this.transactionService.createTransaction(data)
    return transaction;
  }

  public async createRefundForAdmin(refundObj:RefundDto, transId:number)
  {
       await stripe.refunds.create({
        charge: refundObj.chargeId,
        amount: refundObj.amount
      })

      const charge = await this.transactionService.changeTransactionAfterRefundForAdmin(refundObj, transId)
      return charge;
    }

  public async createRefundForCustomer(refundObj:RefundDto, transId:number)
  {
    await stripe.refunds.create({
      charge: refundObj.chargeId
    })

    const charge = await this.transactionService.changeTransactionAfterRefundForCustomer(refundObj, transId)
    return charge;
  }

}
