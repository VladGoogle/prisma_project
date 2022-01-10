import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ModDto{
  @IsString()
  name: string

  @IsNumber()
  price:number;
}