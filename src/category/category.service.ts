import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { CategoryDto } from "./dto/category.dto";
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(data: CategoryDto) {
    return await this.prisma.category.create({
      data: {
        name: data.name,
      },
    });
  }


  async findCategoryByName (name:string){
    const cat =  await  this.prisma.category.findFirst({
      where:{name:name}
    });
    if(!cat){
      throw new NotFoundException(`Category doesn't exists`)
    }

    return cat;
  }

  async findCategoryById (id:number){
    const cat =  await  this.prisma.category.findUnique({
      where:{id:id}
    });
    if(!cat){
      throw new NotFoundException(`Category doesn't exists`)
    }

    return cat;
  }


  async findAllCategories(){
    return await  this.prisma.category.findMany()
  }


  async deleteCategory(id: number){
    return await this.prisma.category.delete({
      where:{id:id},
    })
  }

}


