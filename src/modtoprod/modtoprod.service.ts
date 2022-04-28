import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import { ModToProdDto } from "./dto/modtoprod.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";

@Injectable()
export class ModToProdService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers)
  {}

  async addModifierToProduct(data: ModToProdDto) {
    return await this.prisma.modToProd.create({
      data: {
        productId: data.productId,
        modifierId: data.modifierId
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
    const modToProd = await  this.prisma.modToProd.update({
      where:{id:id},
      data:{
        productId: data.productId,
        modifierId: data.modifierId
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


