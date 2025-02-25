import { ResponseHelper } from '@helpers/responses';
import { Body, Controller, Post } from '@nestjs/common';
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
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const mapper = ProductMapper.toDomain(createProductDto);

      const createdProduct = await this.createProductUseCase.execute(mapper);

      return ResponseHelper.success(createdProduct, 'Product created');
    } catch (error) {
      return ResponseHelper.error(error, 'Error creating product');
    }
  }
}
