import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import { LabelDto } from "./dto/label.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";

@Injectable()
export class LabelService {
  constructor(private prisma: PrismaService,
              private  errorHandler: ErrorHandlers) {}

  async createLabel(data: LabelDto) {
    return await this.prisma.label.create({
      data: {
        name: data.name,
        image: data.image
      },
    });
  }


  async findLabelByName (name:string){
    const label = await  this.prisma.label.findFirst({
      where:{name:name},
      include:{
        products:true
      }
    })
    await  this.errorHandler.NotFoundError(label)
    return label;
  }

  async findLabelById (id:number){
    const label = await this.prisma.label.findUnique({
      where:{id:id},
      include:{
        products:true
      }
    })
    await  this.errorHandler.NotFoundError(label)
    return label;
  }


  async findAllLabels(){
    return await  this.prisma.label.findMany({
      include:{
        products:true
      }
    })
  }

  async addLabelImage(image:string, id:number){
    const label = await this.prisma.label.update({
      where:{id:id},
      data:{
        image: image
      }
    })
    await  this.errorHandler.NotFoundError(label)
    return label;
    }



  async deleteLabel(id: number){
    return await this.prisma.category.delete({
      where:{id:id},
      include:{
        products:true
      }
    });
  }
}


