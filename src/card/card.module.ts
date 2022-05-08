import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";

@Module({
  providers: [CardService],
  controllers: [CardController],
  exports:[CardService],
  imports:[PrismaModule, MiddlewaresModule]
})
export class CardModule {}
