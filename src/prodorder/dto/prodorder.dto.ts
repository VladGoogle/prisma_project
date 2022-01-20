import { IsNumber } from "class-validator";

export class ProductOrderDto{
  @IsNumber()
  quantity: number;

  @IsNumber()
  price:number;

  @IsNumber()
  modToProdId:number;
}