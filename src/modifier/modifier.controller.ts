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
import { ModDto } from "./dto/mod.dto";
import { ModifierService } from "./modifier.service";
import { Role } from "../enums/role.enum";
import { Roles } from "../roles/roles.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UpdateModDto } from "./dto/updateMod.dto";

@Controller()
@UseGuards(AuthGuard('jwt'))
export class ModifierController {
  constructor(private modifierService: ModifierService) {}

  @Roles(Role.ADMIN)
  @Post('modifiers/create')
  async createModifier(@Body() modifier:ModDto){
    return this.modifierService.createModifier(modifier)
  }

  @Roles(Role.ADMIN)
  @Patch('modifiers/:id/update')
  async updateModifierInfo(@Body() mod:UpdateModDto, id:string) {
    const modifierId = parseInt(id);
    console.log(typeof modifierId)
    return await  this.modifierService.updateModifierPrice(mod, modifierId)
  }

  @Get('modifiers/:id')
  async getModifierById(@Param('id') id: string) {
    const modifierId = parseInt(id);
    return await this.modifierService.findModifierById(modifierId)
  }

  @Get('modifiers/:name')
  async getModifierByName(@Body() name: string) {
    return await this.modifierService.findModifierByName(name)
  }

  @Get('modifiers')
  async  getAllModifiers(){
    return await this.modifierService.findAllModifiers()
  }

  @Roles(Role.ADMIN)
  @Delete('modifiers/:id')
  async deleteModifier(@Param('id') id: string){
    const modifierId = parseInt(id);
    return await this.modifierService.deleteModifier(modifierId)
  }
}
