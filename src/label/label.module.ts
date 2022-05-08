import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";

@Module({
  providers: [LabelService],
  controllers: [LabelController],
  exports:[LabelService],
  imports:[PrismaModule, MiddlewaresModule]
})
export class LabelModule {}
