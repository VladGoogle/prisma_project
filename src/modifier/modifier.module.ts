import { Module } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { ModifierController } from './modifier.controller';
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";

@Module({
  providers: [ModifierService],
  controllers: [ModifierController],
  exports: [ModifierService],
  imports:[MiddlewaresModule, PrismaModule]
})
export class ModifierModule {}
