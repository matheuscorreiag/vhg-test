import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class CompleteOrderDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  cardName: string;

  @ApiProperty({ example: '1234567890123456' })
  @IsString()
  cardNumber: string;

  @ApiProperty({ example: '2025-12-31T00:00:00.000Z' })
  @IsISO8601()
  expiration: Date;

  @ApiProperty({ example: '123' })
  @IsString()
  securityCode: string;

  @ApiProperty({ example: 'Casa do João' })
  @IsString()
  addressName: string;

  @ApiProperty({ example: 'Rua Principal, 123' })
  @IsString()
  addressLine1: string;

  @ApiProperty({ example: 'Apto. 456' })
  @IsOptional()
  @IsString()
  addressLine2: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'SP' })
  @IsOptional()
  @IsString()
  region: string;

  @ApiProperty({ example: '01001-000' })
  @IsString()
  zipCode: string;

  @ApiProperty({ example: 'Brasil' })
  @IsString()
  country: string;
}
