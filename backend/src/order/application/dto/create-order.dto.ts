import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderProductDto } from '@order/application/dto/create-order-product.dto';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-v4' })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  products: CreateOrderProductDto[];
}
