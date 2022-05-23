import { IsNumber, IsPositive, IsString } from "class-validator";

export class ProductDto{
  @IsString()
  name: string

  @IsNumber()
  @IsPositive()
  price:number;

  description: string

  @IsNumber()
  @IsPositive()
  labelId:number;

  @IsNumber()
  @IsPositive()
  categoryId:number;
}