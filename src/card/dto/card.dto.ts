import { IsNotEmpty } from "class-validator";

export class CardDto{
  @IsNotEmpty()
  externalId: string;

  @IsNotEmpty()
  userId: number
}