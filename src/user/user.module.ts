import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from "../../prisma/prisma.module";
import { MiddlewaresModule } from "../middlewares/middlewares.module";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [PrismaModule, MiddlewaresModule],
  exports:[UserService]
})
export class UserModule {
}
