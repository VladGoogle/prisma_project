import { NotFoundException } from "@nestjs/common";
export class ErrorHandlers {

  async NotFoundError(obj: object) {
    if (!obj) {
      throw new NotFoundException(`Doesn't exists`)
    }
  }

}