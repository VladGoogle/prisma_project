import { IsNumber } from "class-validator";

export class ModToProdToOrderDto{
  @IsNumber()
  modifierId: number;

  totalProductPrice: number
}