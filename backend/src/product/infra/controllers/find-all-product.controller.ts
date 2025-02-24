import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllProductUseCase } from '@product/application/use-cases/find-all-product.use-case';

@ApiTags('Product')
@Controller({
  path: 'products',
  version: '1',
})
export class FindAllProductController {
  constructor(
    @Inject(FindAllProductUseCase.TOKEN)
    private readonly findAllProductUseCase: FindAllProductUseCase,
  ) {}

  @Get()
  async findAllProducts() {
    return await this.findAllProductUseCase.execute();
  }
}
