import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-v4' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ example: 'uuid-v4' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  quantity: number;

  @ApiProperty({ example: 'red' })
  @IsNotEmpty()
  @IsString()
  color: string;
}
