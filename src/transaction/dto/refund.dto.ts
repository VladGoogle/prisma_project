import { IsEnum } from 'class-validator';
import { ChargeStatus } from "../../enums/ChargeStatus.enum";

export class RefundDto {
  id: number;

  amount: number;

  @IsEnum(ChargeStatus)
  status: ChargeStatus;

  chargeId: string
}
