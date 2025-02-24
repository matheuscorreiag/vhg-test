import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewProductDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
