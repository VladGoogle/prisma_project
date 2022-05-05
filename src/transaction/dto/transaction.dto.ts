import { IsNotEmpty, MinLength, IsEmail, IsEnum, IsString, IsNumber } from "class-validator";
import { ChargeStatus } from "../../enums/ChargeStatus.enum";
import { ChargeCurrency } from "../../enums/ChargeCurrency.enum";

export class TransactionDto {

  source: string;

  amount: number;

  @IsEnum(ChargeCurrency)
  currency:ChargeCurrency;

  description: string;

  orderId: number;

  userId: number;

  cardId: number;
}