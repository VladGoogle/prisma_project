import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import { ErrorHandlers } from "../middlewares/error.handlers";
import { ModToProdService } from "../modtoprod/modtoprod.service";
import { ProductService } from "../product/product.service";
import { ModToProdToOrderDto } from "./dto/modtoprodorder.dto";
import { ModifierService } from "../modifier/modifier.service";
import { ProductOrderService } from "../prodorder/prodorder.service";

@Injectable()
export class ModifierToProductOrderService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers,
              private modifierService: ModifierService,
              private productOrderService: ProductOrderService
              )
  {}

  async addModifierToProductOrder(data: ModToProdToOrderDto, id: number) {
      const product = await this.productOrderService.findProductToOrder(id)
      await this.errorHandler.NotFoundError(product)
      const modifier = await this.modifierService.findModifierById(data.modifierId)
      await this.errorHandler.NotFoundError(modifier)
      return await this.prisma.modToProdToOrder.create({
        data: {
          productOrderId: id,
          modifierId: data.modifierId,
          totalProductPrice: product.price + modifier.price
        },
      })
    }


  async findFinalProductOrder (id:number){
    const productOrder = await this.prisma.modToProdToOrder.findUnique({
      where:{id:id},
      include:{
        productOrder: true,
        modifier: true,
        order: true
      }
    })
    await this.errorHandler.NotFoundError(productOrder)

    return productOrder;
  }


  async findAllFinalProductsToOrder(){
    return await  this.prisma.modToProdToOrder.findMany({
      include:{
        productOrder: true,
        modifier: true,
        order: true
      }
    })
  }


  async changeModifierToProductToOrder(data: ModToProdToOrderDto, prodId:number, id:number){
    const product = await this.productOrderService.findProductToOrder(prodId)
    await this.errorHandler.NotFoundError(product)
    const modifier = await this.modifierService.findModifierById(data.modifierId)
    await this.errorHandler.NotFoundError(modifier)
    const productOrder = await  this.prisma.modToProdToOrder.update({
      where:{id:id},
      data:{
        modifierId: data.modifierId,
        totalProductPrice: product.price + modifier.price
      }
    })
    await this.errorHandler.NotFoundError(productOrder)

    return productOrder;
  }


  async deleteFinalProductToOrder(id: number){
    return await this.prisma.modToProdToOrder.delete({
      where:{id:id},
      include:{
        productOrder: true,
        modifier: true,
        order: true
      }
    });
  }
}


