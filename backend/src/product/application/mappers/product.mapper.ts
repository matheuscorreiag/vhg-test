import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@product/application/dto/create-product.dto';
import { Product } from '@product/domain/entities/product';

@Injectable()
export class ProductMapper {
  static toDomain(dto: CreateProductDto): Product {
    return new Product({
      colors: dto.colors,
      description: dto.description,
      name: dto.name,
      price: dto.price,
    });
  }
}
