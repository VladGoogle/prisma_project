import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import { ProductOrderDto } from "./dto/prodorder.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { ModToProdService } from "../modtoprod/modtoprod.service";
import { ProductService } from "../product/product.service";

@Injectable()
export class ProductOrderService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers,
              private modToProdService: ModToProdService,
              private product: ProductService)
  {}

  async confirmProductToOrder(data: ProductOrderDto) {
    if(!data.productId) {
      const modToprod = await this.modToProdService.findModifierWithProduct(data.modToProdId)
      return await this.prisma.productOrder.create({
        data: {
          quantity: data.quantity,
          price: modToprod.sum * data.quantity,
          modToProdId: data.modToProdId
        },
      })
    }
    else{
      const product = await this.product.findProductById(data.productId)
      return await this.prisma.productOrder.create({
        data: {
          quantity: data.quantity,
          price: product.price * data.quantity,
          productId: data.productId
        },
      })
    };
  }


  async findProductToOrder (id:number){
    const productOrder = await this.prisma.productOrder.findUnique({
      where:{id:id},
      include:{
        modToProd: true,
        product: true,
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
        product: true,
        modToProdsToOrder: true,
        order: true
      }
    })
  }


  async changeProductQuantity(data: ProductOrderDto, id:number){
    const obj = await this.findProductToOrder(id)
    if(!obj.productId) {
      const modToProd = await this.modToProdService.findModifierWithProduct(obj.modToProdId)
      const productOrder = await this.prisma.productOrder.update({
        where: { id: id },
        data: {
          quantity: data.quantity,
          price: modToProd.sum * data.quantity,
          modToProdId: data.modToProdId
        }
      })
      await this.errorHandler.NotFoundError(productOrder)
      return productOrder;
    }
    else{
      const product = await this.product.findProductById(obj.productId)
      const productOrder =  await this.prisma.productOrder.update({
        where: { id: id },
        data: {
          quantity: data.quantity,
          price: product.price * data.quantity,
          productId: data.productId
        },
      })
      await this.errorHandler.NotFoundError(productOrder)
      return productOrder;
    }
  }


  async deleteProductToOrder(id: number){
    return await this.prisma.productOrder.delete({
      where:{id:id},
      include:{
        modToProd:true,
        product: true,
        modToProdsToOrder: true,
        order:true
      }
    });
  }
}


