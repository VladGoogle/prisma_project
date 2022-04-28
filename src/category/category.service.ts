import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryDto } from "./dto/category.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers) {}

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
    await  this.errorHandler.NotFoundError(cat)
    return cat;
  }

  async findCategoryById (id:number){
    const cat =  await  this.prisma.category.findUnique({
      where:{id:id}
    });
    await this.errorHandler.NotFoundError(cat)
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


