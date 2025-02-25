import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@product/application/dto/create-product.dto';
import { Product } from '@product/domain/entities/product';
import { Product as PrismaProductModel } from '@prisma/client';

@Injectable()
export class ProductMapper {
  static toDomain(dto: CreateProductDto): Product {
    return new Product({
      colors: dto.colors,
      description: dto.description,
      name: dto.name,
      price: dto.price,
      imageUrl: dto.imageUrl,
    });
  }

  static prismaToDomain(product: PrismaProductModel): Product {
    return new Product({
      description: product.description,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      colors: product.colors,
      rating: product.rating,
    });
  }

  static prismaArrayToDomain(products: PrismaProductModel[]): Product[] {
    return products.map((product) => {
      return new Product({
        rating: product.rating,
        description: product.description,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        colors: product.colors,
      });
    });
  }
}
