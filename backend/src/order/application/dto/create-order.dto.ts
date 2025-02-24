import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderProductDto } from '@order/application/dto/create-order-product.dto';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-v4' })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateOrderProductDto)
  products: CreateOrderProductDto[];
}
