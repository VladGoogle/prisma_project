import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ModifierToProductOrderService } from "./modtoprodtoorder.service";
import { ModToProdToOrderDto } from "./dto/modtoprodorder.dto";

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ModToProdToOrderController {
  constructor(private modToProdToOrderService: ModifierToProductOrderService) {
  }

  @Post('productToOrder/:id/modifiersToProductsToOrder')
  async addModifierToProductOrder(@Body() obj:ModToProdToOrderDto, @Param('id') id: string){
    const prodId = parseInt(id);
    return this.modToProdToOrderService.addModifierToProductOrder(obj, prodId)
  }

  @Patch('productToOrder/:prodId/modifiersToProductsToOrder/:id')
  async changeModifierToProductToOrder(@Body() obj:ModToProdToOrderDto, @Param('id') id: string, @Param('prodId') prodId: string){
    const productId = parseInt(prodId);
    const finalId = parseInt(id);
    return this.modToProdToOrderService.changeModifierToProductToOrder(obj, productId, finalId)
  }


  @Get('modifiersToProductsToOrder/:id')
  async findFinalProductOrder(@Param('id') id: string) {
    const productId = parseInt(id);
    return await this.modToProdToOrderService.findFinalProductOrder(productId)
  }


  @Get('modifiersToProductsToOrder')
  async  findAllFinalProductsToOrder(){
    return await this.modToProdToOrderService.findAllFinalProductsToOrder()
  }


  @Delete('modifiersToProductsToOrder/:id')
  async deleteFinalProductToOrder(@Param('id') id: string){
    const productId = parseInt(id);
    return await this.modToProdToOrderService.deleteFinalProductToOrder(productId)
  }
}
