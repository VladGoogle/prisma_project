import { Module } from '@nestjs/common';
import { ModToProdService } from "./modtoprod.service";
import { ModToProdController } from "./modtoprod.controller";
import { PrismaService } from "../prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";

@Module({
  providers: [ModToProdService, PrismaService, ErrorHandlers],
  controllers: [ModToProdController]
})
export class ModtoprodModule {}
