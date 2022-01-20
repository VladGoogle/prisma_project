import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { ModDto } from "./dto/mod.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";

@Injectable()
export class ModifierService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers)
  {}

  async createModifier(data: ModDto) {
    return await this.prisma.modifier.create({
      data: {
        name: data.name,
        price: data.price
      },
    });
  }


  async findModifierByName (name:string){
    const modifier = await  this.prisma.modifier.findFirst({
      where:{name:name},
      include:{
        modToProds:true,
        modToProdsToOrder:true
      }
    })
    await this.errorHandler.NotFoundError(modifier)

    return modifier;
  }

  async findModifierById (id:number){
    const modifier = await this.prisma.modifier.findUnique({
      where:{id:id},
      include:{
        modToProds:true,
        modToProdsToOrder: true
      }
    })
    await this.errorHandler.NotFoundError(modifier)

    return modifier;
  }


  async findAllModifiers(){
    return await  this.prisma.modifier.findMany({
      include:{
        modToProds: true,
        modToProdsToOrder:true
      }
    })
  }

  async updateModifierInfo(data: ModDto, id:number){
    const mod = await  this.prisma.modifier.update({
      where:{id:id},
      data:{
        name: data.name,
        price: data.price
      }
    })
    await this.errorHandler.NotFoundError(mod)

    return mod;
  }


  async deleteModifier(id: number){
    return await this.prisma.modifier.delete({
      where:{id:id},
      include:{
        modToProds: true,
        modToProdsToOrder: true
      }
    });
  }
}


