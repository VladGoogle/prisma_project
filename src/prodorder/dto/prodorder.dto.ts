import { IsNumber } from "class-validator";

export class ProductOrderDto{
  @IsNumber()
  quantity: number;

  price:number;

  modToProdId:number;

  productId:number;
}