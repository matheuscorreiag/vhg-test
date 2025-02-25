import { UpsertProductToOrderController } from '@order/infra/controllers/upsert-product-to-order.controller';
import { mockRequest } from '@order/infra/mocks';
import { mockOrderRepository } from '@order/infra/mocks/repositories/mock-order.repository';
import { mockUpsertProductToOrderUseCase } from '@order/infra/mocks/use-cases/mock-upsert-product-to-order.use-case';
import { mockProductRepository } from '@product/infra/mocks/repositories/mock-product.repository';
import { Request } from 'express';

describe('UpsertProductController', () => {
  const productRepository = new mockProductRepository();
  const repository = new mockOrderRepository();
  const useCase = new mockUpsertProductToOrderUseCase(
    repository,
    productRepository,
  );
  const controller = new UpsertProductToOrderController(useCase);

  it('should return correct data', async () => {
    const result = await controller.upsertProductToOrder(
      {
        color: 'red',
        productId: '123',
        quantity: 1,
      },
      mockRequest as Request,
    );

    expect(result!.success).toBe(true);
  });

  it('should return error if the use case return an error', async () => {
    jest.spyOn(repository, 'save').mockRejectedValue(() => {
      throw new Error('Error');
    });

    expect(
      controller.upsertProductToOrder(
        {
          color: 'red',
          productId: '123',
          quantity: 1,
        },
        mockRequest as Request,
      ),
    ).rejects.toThrow('Error');
  });
});
