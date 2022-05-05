import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "../middlewares/error.handlers";

@Module({
  providers: [CardService, PrismaService, ErrorHandlers],
  controllers: [CardController],
  exports:[CardModule]
})
export class CardModule {}
