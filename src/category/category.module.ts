import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from "../prisma.service";
import { RolesGuard } from "../roles/roles.guard";

@Module({
  providers: [CategoryService, PrismaService, RolesGuard],
  controllers: [CategoryController],
})
export class CategoryModule {}
