import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllProductsUseCase } from '@product/application/use-cases/find-all-products.use-case';

@ApiTags('Product')
@Controller({
  path: 'products',
  version: '1',
})
export class FindAllProductController {
  constructor(
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
  ) {}

  @Get()
  async findAllProducts() {
    return await this.findAllProductsUseCase.execute();
  }
}
