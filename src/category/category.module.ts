import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  exports:[CategoryService],
  imports:[PrismaModule, MiddlewaresModule]
})
export class CategoryModule {}
