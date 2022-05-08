import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  exports:[ProductService],
  imports:[PrismaModule, MiddlewaresModule]
})
export class ProductModule {}
