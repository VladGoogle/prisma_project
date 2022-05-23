import { isEmpty, IsNumber } from "class-validator";

export class UpdateModDto{
  @IsNumber()
  price:number;
}