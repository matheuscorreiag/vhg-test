import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Product 1' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'A product description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '10.99' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: '#ff0000' })
  @IsNotEmpty()
  @IsString()
  color: string;
}
