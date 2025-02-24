import { CreateProductDto } from '@application/dto/product/create-product.dto';
import { Product } from '@domain/entities/product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductMapper {
  static toDomain(dto: CreateProductDto): Product {
    return new Product({
      color: dto.color,
      description: dto.description,
      name: dto.name,
      price: dto.price,
    });
  }
}
