import { Global, Module } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ErrorHandlers } from "./error.handlers";

@Global()
@Module({
  providers: [ErrorHandlers],
  exports: [ErrorHandlers],
})
export class MiddlewaresModule {}
