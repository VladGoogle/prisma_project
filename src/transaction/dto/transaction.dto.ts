import { IsNotEmpty, MinLength, IsEmail, IsEnum, IsString, IsNumber } from "class-validator";
import { ChargeStatus } from "../../enums/ChargeStatus.enum";
import { ChargeCurrency } from "../../enums/ChargeCurrency.enum";

export class TransactionDto {


  source: string;


  amount: number;

  @IsEnum(ChargeStatus)
  status: ChargeStatus;

  @IsEnum(ChargeCurrency)
  currency:ChargeCurrency;


  description: string;


  token: string;


  orderId: number;


  cardId: number;
}