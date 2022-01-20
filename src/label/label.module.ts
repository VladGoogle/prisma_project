import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { PrismaService } from "../prisma.service";

@Module({
  providers: [LabelService, PrismaService],
  controllers: [LabelController]
})
export class LabelModule {}
