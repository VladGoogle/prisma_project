import { IsNumber } from "class-validator";

export class ModToProdDto{

  @IsNumber()
  productId: number;

  @IsNumber()
  modifierId:number;

  sum: number;
}