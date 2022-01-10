import { IsNotEmpty } from 'class-validator';

export class LabelDto {
  @IsNotEmpty()
  name: string

  image:string;
}
