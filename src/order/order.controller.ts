import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Put } from "@nestjs/common";
import { OrderDto } from "./dto/order.dto";
import { OrderService } from "./order.service";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../roles/roles.decorator";
import { Role } from "../enums/role.enum";
import { RolesGuard } from "../roles/roles.guard";

@Controller()
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private orderService: OrderService) {}


  @Post('orders')
  async createOrder(@Body() order:OrderDto){
    return this.orderService.confirmOrder(order)
  }

  @Patch('orders/:id')
  async updateOrderInfo(@Body() order:OrderDto, @Param('id') id: string){
    const orderId = parseInt(id);
    return this.orderService.changeOrderInfo(order, orderId)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Put('orders/:id')
  async changeOrderStatus(@Body() order:OrderDto, @Param('id') id: string){
    const orderId = parseInt(id);
    return this.orderService.changeOrderStatus(order, orderId)
  }

  @Get('orders/:id')
  async getOrderById(@Param('id') id: string) {
    const orderId = parseInt(id);
    return await this.orderService.findOrder(orderId);
  }


  @Get('orders')
  async  getAllOrders(){
    return await this.orderService.findAllOrders()
  }


  @Delete('orders/:id')
  async deleteOrder(@Param('id') id: string){
    const orderId = parseInt(id);
    return await this.orderService.deleteOrder(orderId)
  }

}

