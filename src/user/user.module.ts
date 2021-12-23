import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.servise';

@Module({
  imports: [PrismaService],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
