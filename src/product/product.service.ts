import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { ProductDto } from "./dto/prod.dto";
import { ErrorHandlers } from "../middlewares/error.handlers";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService,
              private errorHandler: ErrorHandlers)
  {}

  async createProduct(data: ProductDto) {
    return await this.prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        labelId: data.labelId,
        categoryId: data.categoryId
      },
    });
  }


  async findProductByName (name:string){
    const product = await  this.prisma.product.findFirst({
      where:{name:name},
      include:{
        label: true,
        category:true
      }
    })
    await this.errorHandler.NotFoundError(product)

    return product;
  }

  async findProductById (id:number){
    const product = await this.prisma.product.findUnique({
      where:{id:id},
      include:{
        label:true,
        category:true
      }
    })
    await this.errorHandler.NotFoundError(product)

    return product;
  }


  async findAllProducts(){
    return await  this.prisma.product.findMany({
      include:{
        label:true,
        category: true
      }
    })
  }

  async updateProductInfo(data: ProductDto, id:number){
    const product = await  this.prisma.product.update({
      where:{id:id},
      data:{
        name: data.name,
        price: data.price,
        description: data.description,
        labelId: data.labelId,
        categoryId: data.categoryId
      }
    })
    await this.errorHandler.NotFoundError(product)

    return product;
  }


  async deleteProduct(id: number){
    return await this.prisma.product.delete({
      where:{id:id},
      include:{
        label: true,
        category:true
      }
    });
  }
}


