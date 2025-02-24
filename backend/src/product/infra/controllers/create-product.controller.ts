import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from '@product/application/dto/create-product.dto';
import { ProductMapper } from '@product/application/mappers/product.mapper';
import { CreateProductUseCase } from '@product/application/use-cases/create-product.use-case';

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
    const fakeImageUrl = 'AAA';
    const mapper = ProductMapper.toDomain(createProductDto, fakeImageUrl);

    return await this.createProductUseCase.execute(mapper);
  }
}
