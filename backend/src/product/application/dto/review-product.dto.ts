import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReviewProductDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
