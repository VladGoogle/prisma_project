import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { LabelDto } from "./dto/label.dto";

@Injectable()
export class LabelService {
  constructor(private prisma: PrismaService) {}

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
    if(!label){
      throw new NotFoundException(`Label doesn't exists`)
    };

    return label;
  }

  async findLabelById (id:number){
    const label = await this.prisma.label.findUnique({
      where:{id:id},
      include:{
        products:true
      }
    })
    console.log(typeof label)
    if(!label){
      throw new NotFoundException(`Label doesn't exists`)
    };

    return label;;
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
    if(!label){
      throw new NotFoundException(`Label doesn't exists`)
    };

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


