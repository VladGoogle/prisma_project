import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ModDto } from "./dto/mod.dto";
import { ModifierService } from "./modifier.service";
import { Role } from "../enums/role.enum";
import { Roles } from "../roles/roles.decorator";

@Controller()
export class ModifierController {
  constructor(private modifierService: ModifierService) {}

  @Roles(Role.ADMIN)
  @Post('modifiers')
  async createModifier(@Body() modifier:ModDto){
    return this.modifierService.createModifier(modifier)
  }

  @Roles(Role.ADMIN)
  @Patch('modifiers/:id')
  async updateModifierInfo(@Body() mod:ModDto, id:string) {
    const modifierId = parseInt(id);
    return await  this.modifierService.updateModifierInfo(mod, modifierId)
  }

  @Get('modifiers/:id')
  async getModifierById(@Param('id') id: string) {
    const modifierId = parseInt(id);
    return await this.modifierService.findModifierById(modifierId)
  }

  @Get('modifiers/name')
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
