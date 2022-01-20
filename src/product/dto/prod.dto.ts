import { IsNumber, IsString } from "class-validator";

export class ProductDto{
  @IsString()
  name: string

  @IsNumber()
  price:number;


  description: string

  @IsNumber()
  labelId:number;

  @IsNumber()
  categoryId:number;
}