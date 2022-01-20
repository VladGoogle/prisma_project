import { Module } from '@nestjs/common';
import { ModifierService } from './modifier.service';
import { ModifierController } from './modifier.controller';
import { ErrorHandlers } from "../middlewares/error.handlers";
import { PrismaService } from "../prisma.service";
import { RolesGuard } from "../roles/roles.guard";

@Module({
  providers: [ModifierService, ErrorHandlers, PrismaService, RolesGuard],
  controllers: [ModifierController]
})
export class ModifierModule {}
