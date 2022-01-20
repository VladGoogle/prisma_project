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
import { ProductOrderDto } from "./dto/prodorder.dto";
import { ProductOrderService } from "./prodorder.service";
import { AuthGuard } from "@nestjs/passport";

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ProductOrderController {
  constructor(private productOrderService: ProductOrderService) {}

  @Post('confirm/products/orders')
  async addModifierToProduct(@Body() obj:ProductOrderDto){
    return this.productOrderService.confirmProductToOrder(obj)
  }

  @Patch('change/products/orders/:id')
  async changeProductToOrderInfo(@Body() obj:ProductOrderDto, @Param('id') id:string){
    const productOrderId = parseInt(id);
    return this.productOrderService.changeProductToOrderInfo(obj, productOrderId)
  }

  @Get('products/orders/:id')
  async getProductToOrder(@Param('id') id: string) {
    const productOrderId = parseInt(id);
    return await this.productOrderService.findProductToOrder(productOrderId)
  }


  @Get('products/orders')
  async  getAllModifiersWithProducts(){
    return await this.productOrderService.findAllProductsToOrder()
  }


  @Delete('products/orders/:id')
  async deleteProductOrder(@Param('id') id: string){
    const productOrderId = parseInt(id);
    return await this.productOrderService.deleteProductToOrder(productOrderId)
  }
}
