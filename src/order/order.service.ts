import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderDto } from "./dto/order.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { PrismaService } from "../prisma.service";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers)
  {}

  async confirmOrder(data: OrderDto) {
    return await this.prisma.order.create({
      data: {
        description: data.description,
        totalPrice: data.totalPrice,
        status: data.status,
        isMods: data.isMods,
        userId: data.userId,
        productOrderId: data.productOrderId,
        modToProdToOrderId: data.modToProdToOrderId
      },
    });
  }


  async findOrder (id:number){
    const order = await this.prisma.order.findUnique({
      where:{id:id},
      include:{
        productsOrder:true,
        modToProdsToOrder: true,
        transaction: true
      }
    })
    await this.errorHandler.NotFoundError(order)

    return order;
  }


  async findAllOrders(){
    return await  this.prisma.order.findMany({
      include:{
        productsOrder:true,
        modToProdsToOrder: true,
        transaction: true
      }
    })
  }


  async changeOrderInfo(data: OrderDto, id:number){
    const order = await  this.prisma.order.update({
      where:{id:id},
      data:{
        description: data.description,
        totalPrice: data.totalPrice,
        isMods: data.isMods,
        userId: data.userId,
        productOrderId: data.productOrderId,
        modToProdToOrderId: data.modToProdToOrderId
      }
    })
    await this.errorHandler.NotFoundError(order)

    return order;
  }

  async changeOrderStatus(data: OrderDto, id:number){
    const order = await  this.prisma.order.update({
      where:{id:id},
      data:{
        status: data.status
      }
    })
    await this.errorHandler.NotFoundError(order)

    return order;
  }


  async deleteOrder(id: number){
    return await this.prisma.order.delete({
      where:{id:id},
      include:{
        productsOrder:true,
        modToProdsToOrder: true,
        transaction: true
      }
    });
  }
}


