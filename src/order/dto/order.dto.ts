import { IsArray, IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";
import { OrderStatus } from "../../enums/orderStatus.enum";

export class OrderDto{
  description: string;

  status:OrderStatus;

  @IsBoolean()
  isMods: boolean;

  @IsNumber()
  userId: number;

  productOrderId:number;

  modToProdToOrderId:number;
}