import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { ErrorHandlers } from "../middlewares/error.handlers";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [PrismaModule, ErrorHandlers],
  exports:[UserService]
})
export class UserModule {}
