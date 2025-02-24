import { FindAllProductUseCase } from '@application/use-cases/product/find-all-product.use-case';
import { Controller, Get, Inject } from '@nestjs/common';

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
