import { PrismaService } from '@libs/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductMapper } from '@product/application/mappers/product.mapper';
import { Product } from '@product/domain/entities/product';
import { ProductRepository } from '@product/domain/repositories/product.repository';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return ProductMapper.prismaArrayToDomain(products);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { orderProduct: true },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return ProductMapper.prismaToDomain(product);
  }

  async save(product: Product): Promise<Product> {
    const savedProduct = await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        colors: product.colors,
      },
      include: { orderProduct: true },
    });

    return ProductMapper.prismaToDomain(savedProduct);
  }

  async update(productId: string, product: Product): Promise<Product> {
    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        colors: product.colors,
      },
      include: { orderProduct: true },
    });

    return ProductMapper.prismaToDomain(updatedProduct);
  }
}
