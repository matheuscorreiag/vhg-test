import { CreateProductDto } from '@application/dto/product/create-product.dto';
import { ProductMapper } from '@application/mappers/product/product.mapper';
import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case';
import { Body, Controller, Post } from '@nestjs/common';

@Controller({
  path: 'products',
  version: '1',
})
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const mapper = ProductMapper.toDomain(createProductDto);

    return await this.createProductUseCase.execute(mapper);
  }
}
