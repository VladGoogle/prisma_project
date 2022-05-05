import { IsNumber } from "class-validator";

export class ModToProdToOrderDto{

  productOrderId:number;

  @IsNumber()
  modifierId: number;

  totalProductPrice: number
}