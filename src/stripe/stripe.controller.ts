import { Controller, UseGuards } from "@nestjs/common";
import { StripeService } from "./stripe.service";
import {
  Body,
  Param,
  Post,
} from "@nestjs/common";
import { TransactionDto } from "../transaction/dto/transaction.dto";
import { RefundDto } from "../transaction/dto/refund.dto";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../roles/roles.decorator";
import { Role } from "../enums/role.enum";

@UseGuards(AuthGuard('jwt'))
@Controller()
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('user/:id/customer')
  async createCustomer(@Param('id') id:string) {
    const userId = parseInt(id)
    return await this.stripeService.newCustomer(userId)
  }

  @Post('user/:user_id/card/:card_id/source')
  async createSource(@Param('user_id') user_id:string,@Param('card_id') card_id:string) {
    const userId = parseInt(user_id)
    const cardId = parseInt(card_id)
    return await this.stripeService.newSource(cardId, userId)
  }

  @Post('charges')
  async createCharge(@Body() charge:TransactionDto) {
    return await this.stripeService.payForOrderWithToken(charge)
  }

  @Roles(Role.ADMIN)
  @Post('admin/transaction/:id/refund')
  async createRefundForAdmin(@Body() refundObj:RefundDto, @Param('id') id:string) {
    const transId = parseInt(id)
    return await this.stripeService.createRefundForAdmin(refundObj, transId)
  }

  @Post('customer/transaction/:id/refund')
  async createRefundForCustomer(@Body() refundObj:RefundDto, @Param('id') id:string) {
    const transId = parseInt(id)
    return await this.stripeService.createRefundForCustomer(refundObj, transId)
  }
}
