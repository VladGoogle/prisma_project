import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { ProductOrderDto } from "./dto/prodorder.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";

@Injectable()
export class ProductOrderService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers)
  {}

  async confirmProductToOrder(data: ProductOrderDto) {
    return await this.prisma.productOrder.create({
      data: {
        quantity: data.quantity,
        price: data.price,
        modToProdId: data.modToProdId
      },
    });
  }


  async findProductToOrder (id:number){
    const productOrder = await this.prisma.productOrder.findUnique({
      where:{id:id},
      include:{
        modToProd: true,
        modToProdsToOrder:true,
        order:true
      }
    })
    await this.errorHandler.NotFoundError(productOrder)

    return productOrder;
  }


  async findAllProductsToOrder(){
    return await  this.prisma.productOrder.findMany({
      include:{
        modToProd: true,
        modToProdsToOrder: true,
        order: true
      }
    })
  }


  async changeProductToOrderInfo(data: ProductOrderDto, id:number){
    const productOrder = await  this.prisma.productOrder.update({
      where:{id:id},
      data:{
        quantity: data.quantity,
        price: data.price,
        modToProdId: data.modToProdId
      }
    })
    await this.errorHandler.NotFoundError(productOrder)

    return productOrder;
  }


  async deleteProductToOrder(id: number){
    return await this.prisma.productOrder.delete({
      where:{id:id},
      include:{
        modToProd:true,
        modToProdsToOrder: true,
        order:true
      }
    });
  }
}


