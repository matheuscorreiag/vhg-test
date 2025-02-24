import { CreateProductDto } from '@application/dto/product/create-product.dto';
import { ProductMapper } from '@application/mappers/product/product.mapper';
import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller({
  path: 'products',
  version: '1',
})
export class CreateProductController {
  constructor(
    @Inject(CreateProductUseCase.TOKEN)
    private readonly createProductUseCase: CreateProductUseCase,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const mapper = ProductMapper.toDomain(createProductDto);

    return await this.createProductUseCase.execute(mapper);
  }
}
