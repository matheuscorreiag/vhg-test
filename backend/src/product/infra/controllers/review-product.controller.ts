import { Body, Controller, Put } from '@nestjs/common';
import { ReviewProductDto } from '@product/application/dto/review-product.dto';
import { ReviewProductUseCase } from '@product/application/use-cases/review-product.use-case';

@Controller({
  path: 'products',
  version: '1',
})
export class ReviewProductController {
  constructor(private readonly reviewProductUseCase: ReviewProductUseCase) {}

  @Put('/:productId')
  reviewProduct(@Body() reviewProductDto: ReviewProductDto) {
    return this.reviewProductUseCase.execute(
      reviewProductDto.productId,
      reviewProductDto.rating,
    );
  }
}
