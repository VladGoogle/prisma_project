import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { ErrorHandlers } from "../middlewares/error.handlers";

@Module({
  providers: [UserService,PrismaService, ErrorHandlers],
  exports: [UserService],
  imports:[ErrorHandlers],
  controllers: [UserController],
})
export class UserModule {}
