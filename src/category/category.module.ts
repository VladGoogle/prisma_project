import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from "../../prisma/prisma.service";
import { RolesGuard } from "../roles/roles.guard";
import { ErrorHandlers } from "../middlewares/error.handlers";

@Module({
  providers: [CategoryService, PrismaService, RolesGuard, ErrorHandlers],
  controllers: [CategoryController],
})
export class CategoryModule {}
