import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class AddItemToOrderDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNotEmpty()
  @IsString()
  color: string;
}
