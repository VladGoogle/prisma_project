import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderDto } from "./dto/order.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { PrismaService } from "../../prisma/prisma.service";
import { ModifierToProductOrderService } from "../modtoprodtoorder/modtoprodtoorder.service";
import { ProductOrderService } from "../prodorder/prodorder.service";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers,
              private productOrderService: ProductOrderService,
              private modToProdToOrderService: ModifierToProductOrderService)
  {}

  async confirmOrder(data: OrderDto) {
    if(data.isMods) {
      const product = await this.modToProdToOrderService.findFinalProductOrder(data.modToProdToOrderId)
      return await this.prisma.order.create({
      data: {
        description: data.description,
        totalPrice: product.totalProductPrice,
        status: data.status,
        isMods: data.isMods,
        userId: data.userId,
        modToProdToOrderId: data.modToProdToOrderId
      },
    });
  }
    else {
      const product = await this.productOrderService.findProductToOrder(data.productOrderId)
      return await this.prisma.order.create({
        data: {
          description: data.description,
          totalPrice: product.price,
          status: data.status,
          isMods: data.isMods,
          userId: data.userId,
          productOrderId: data.productOrderId
        },
      });
    }
  }


  async findOrder (id:number){
    const order = await this.prisma.order.findUnique({
      where:{id:id},
      include:{
        user: true,
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
        user: true,
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


