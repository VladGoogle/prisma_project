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
import { ModToProdDto } from "./dto/modtoprod.dto";
import { ModToProdService } from "./modtoprod.service";
import { Role } from "../enums/role.enum";
import { Roles } from "../roles/roles.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ModToProdController {
  constructor(private modtoprodService: ModToProdService) {}

  @Post('product/add/modifier')
  async addModifierToProduct(@Body() obj:ModToProdDto){
    return this.modtoprodService.addModifierToProduct(obj)
  }

  @Patch('product/change/modifier')
  async changeModifierToProduct(@Body() obj:ModToProdDto, @Param('id') id:string){
    const modtoprodId = parseInt(id);
    return this.modtoprodService.changeModifierToProduct(obj, modtoprodId)
  }

  @Get('products/modifiers/:id')
  async getModifierWithProduct(@Param('id') id: string) {
    const modtoprodId = parseInt(id);
    return await this.modtoprodService.findModifierWithProduct(modtoprodId)
  }


  @Get('products/modifiers')
  async  getAllModifiersWithProducts(){
    return await this.modtoprodService.findAllModifiersWithProducts()
  }


  @Delete('products/modifiers/:id')
  async deleteModToProd(@Param('id') id: string){
    const modifierId = parseInt(id);
    return await this.modtoprodService.deleteModToProd(modifierId)
  }
}
