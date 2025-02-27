import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class CompleteOrderDto {
  @IsString()
  cardName: string;

  @IsString()
  cardNumber: string;

  @IsISO8601()
  expiration: Date;

  @IsString()
  securityCode: string;

  @IsString()
  addressName: string;

  @IsString()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2: string;

  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  region: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;
}
