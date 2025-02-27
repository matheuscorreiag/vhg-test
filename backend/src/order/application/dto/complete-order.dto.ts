import { IsISO8601, IsString } from 'class-validator';

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

  @IsString()
  addressLine2: string;

  @IsString()
  city: string;

  @IsString()
  region: string;

  @IsString()
  zipCode: string;

  @IsString()
  country: string;
}
