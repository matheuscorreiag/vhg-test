import { ResponseHelper } from '@helpers/responses';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindProductByIdUseCase } from '@product/application/use-cases/find-product-by-id.use.case';

@ApiTags('Product')
@Controller({
  path: 'products',
  version: '1',
})
export class FindProductByIdController {
  constructor(
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
  ) {}

  @Get('/:productId')
  async findProductById(@Param('productId') productId: string) {
    try {
      const product = await this.findProductByIdUseCase.execute(productId);
      return ResponseHelper.success(product);
    } catch (error) {
      return ResponseHelper.error(
        error,
        `Error finding product with ID = ${productId}`,
      );
    }
  }
}
