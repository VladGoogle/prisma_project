import { PrismaClient } from '@prisma/client'
import { NotFoundException } from "@nestjs/common";

const prisma = new PrismaClient({
  rejectOnNotFound: {
    findFirst: {
      User: (err) => new NotFoundException(`User doesn't exists`),
    },
    findUnique: {
      User: (err) => new NotFoundException(`User doesn't exists`),
    }
  }
})
export default prisma