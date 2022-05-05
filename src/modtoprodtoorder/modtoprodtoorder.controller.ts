import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ModifierToProductOrderService } from "./modtoprodtoorder.service";
import { ModToProdToOrderDto } from "./dto/modtoprodorder.dto";

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ModToProdToOrderController {
  constructor(private modToProdToOrderService: ModifierToProductOrderService) {
  }

  @Post('modifiersToProductsToOrder')
  async addModifierToProductOrder(@Body() obj:ModToProdToOrderDto){
    return this.modToProdToOrderService.addModifierToProductOrder(obj)
  }

  @Patch('modifiersToProductsToOrder/:id')
  async changeModifierToProductToOrder(@Body() obj:ModToProdToOrderDto, @Param('id') id: string){
    const prodId = parseInt(id);
    return this.modToProdToOrderService.changeModifierToProductToOrder(obj, prodId)
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
