import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class ModDto{
  @IsString()
  name: string

  @IsNumber()
  @IsPositive()
  price:number;
}