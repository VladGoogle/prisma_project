import { IsArray, IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";
import { OrderStatus } from "../../enums/orderStatus.enum";

export class OrderDto{
  description: string;

  @IsNumber()
  totalPrice:number;

  status:OrderStatus;

  @IsBoolean()
  isMods: boolean;

  @IsNumber()
  userId: number;

  @IsNumber()
  productOrderId:number;

  modToProdToOrderId:number;
}