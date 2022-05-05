import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { RolesGuard } from "../roles/roles.guard";

@Module({
  providers: [ProductService, PrismaService, ErrorHandlers, RolesGuard],
  controllers: [ProductController],
  exports:[ProductService]
})
export class ProductModule {}
