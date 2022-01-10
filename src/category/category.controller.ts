import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CategoryDto } from "./dto/category.dto";
import { CategoryService } from "./category.service";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../roles/roles.decorator";
import { Role } from "../enums/role.enum";

@Controller()
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Roles(Role.ADMIN)
  @Post('categories')
  async createCategory(@Body() category:CategoryDto){
    return this.categoryService.createCategory(category)
  }

  @Get('categories/:id')
  async getCategoryById(@Param('id') id: string) {
    const categoryId = parseInt(id);
    return await this.categoryService.findCategoryById(categoryId);
  }

  @Get('categories/name')
  async getCategoryByName(@Body() name: string) {
    return await this.categoryService.findCategoryByName(name);
  }

  @Get('categories')
  async  getAllCategories(){
    return await this.categoryService.findAllCategories()
  }

  @Roles(Role.ADMIN)
  @Delete('categories/:id')
  async deleteCategory(@Param('id') id: string){
    const categoryId = parseInt(id);
    return await this.categoryService.deleteCategory(categoryId)
  }

}

