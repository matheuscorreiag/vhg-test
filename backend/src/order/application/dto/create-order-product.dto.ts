import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  color: string;
}
