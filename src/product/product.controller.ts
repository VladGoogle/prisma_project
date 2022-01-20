import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ProductDto } from "./dto/prod.dto";
import { ProductService } from "./product.service";
import { Role } from "../enums/role.enum";
import { Roles } from "../roles/roles.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private productService: ProductService) {}

  @Roles(Role.ADMIN)
  @Post('products/create')
  async createProduct(@Body() product:ProductDto){
    return this.productService.createProduct(product)
  }

  @Roles(Role.ADMIN)
  @Patch('products/:id')
  async updateProductInfo(@Body() mod:ProductDto, id:string) {
    const productId = parseInt(id);
    return await  this.productService.updateProductInfo(mod, productId)
  }

  @Get('products/:id')
  async getProductById(@Param('id') id: string) {
    const productId = parseInt(id);
    return await this.productService.findProductById(productId)
  }

  @Get('products/:name')
  async getProductByName(@Body() name: string) {
    return await this.productService.findProductByName(name)
  }

  @Get('products')
  async  getAllProducts(){
    return await this.productService.findAllProducts()
  }

  @Roles(Role.ADMIN)
  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string){
    const productId = parseInt(id);
    return await this.productService.deleteProduct(productId)
  }
}
