import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import { ModToProdDto } from "./dto/modtoprod.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { ProductService } from "../product/product.service";
import { ModifierService } from "../modifier/modifier.service";

@Injectable()
export class ModToProdService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers,
              private productService: ProductService,
              private modifierService: ModifierService)
  {}

  async addModifierToProduct(data: ModToProdDto) {
    const prod = await  this.productService.findProductById(data.productId)
    const mod = await  this.modifierService.findModifierById(data.modifierId)
    return await this.prisma.modToProd.create({
      data: {
        productId: data.productId,
        modifierId: data.modifierId,
        sum: prod.price + mod.price
      },
    });
  }


  async findModifierWithProduct (id:number){
    const modToProd = await this.prisma.modToProd.findUnique({
      where:{id:id},
      include:{
        product: true,
        modifier: true
      }
    })
    await this.errorHandler.NotFoundError(modToProd)

    return modToProd;
  }


  async findAllModifiersWithProducts(){
    return await  this.prisma.modToProd.findMany({
      include:{
        product: true,
        modifier:true
      }
    })
  }


  async changeModifierToProduct (data: ModToProdDto, id:number){
    const prod = await  this.productService.findProductById(data.productId)
    const mod = await  this.modifierService.findModifierById(data.modifierId)
    const modToProd = await  this.prisma.modToProd.update({
      where:{id:id},
      data:{
        productId: data.productId,
        modifierId: data.modifierId,
        sum: prod.price + mod.price
      }
    })
    await this.errorHandler.NotFoundError(modToProd)

    return modToProd;
  }


  async deleteModToProd(id: number){
    return await this.prisma.modToProd.delete({
      where:{id:id},
      include:{
        product: true,
        modifier: true
      }
    });
  }
}


