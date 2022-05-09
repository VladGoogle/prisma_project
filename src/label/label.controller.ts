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
import { LabelService } from "./label.service";
import { LabelDto } from "./dto/label.dto";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../roles/roles.decorator";
import { Role } from "../enums/role.enum";
import { editFileName } from "../constants/file.constants";
import { imageFileFilter } from "../constants/file.constants";
import { maxSize } from "../constants/file.constants";


@Controller()
@UseGuards(AuthGuard('jwt'))
export class LabelController {
  constructor(private labelService: LabelService,
  ) {}

  @Roles(Role.ADMIN)
  @Post('labels/create')
  async createLabel(@Body() label:LabelDto){
    return this.labelService.createLabel(label)
  }

  @Roles(Role.ADMIN)
  @Patch('labels/:id/upload')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination:'./uploads',
      filename: editFileName,
      }),
    fileFilter: imageFileFilter,
    limits:{
      fileSize: maxSize
    }
    }),
  )
  async uploadLabelImage( @UploadedFile() file, @Req() req, @Param('id') id:string){
    const labelId = parseInt(id)
    return await this.labelService.addLabelImage(req.file.path, labelId)
  }

  @Get('labels/:id')
  async getLabelById(@Param('id') id: string) {
    const labelId = parseInt(id);
    return await this.labelService.findLabelById(labelId)
  }

  @Get('labels/name')
  async getLabelByName(@Body() name: string) {
    return await this.labelService.findLabelByName(name)
  }

  @Get('labels')
  async  getAllLabels(){
    return await this.labelService.findAllLabels()
  }

  @Roles(Role.ADMIN)
  @Delete('labels/:id')
  async deleteCategory(@Param('id') id: string){
    const labelId = parseInt(id);
    return await this.labelService.deleteLabel(labelId)
  }

}

