import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";
import { RolesGuard } from "../roles/roles.guard";

@Module({
  providers: [LabelService, PrismaService, ErrorHandlers, RolesGuard],
  controllers: [LabelController]
})
export class LabelModule {}
