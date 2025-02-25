import { AddItemToOrderController } from '@order/infra/controllers/add-item-to-order.controller';
import { mockOrderRepository } from '@order/infra/mocks/repositories/mock-order.repository';
import { mockAddItemToOrderUseCase } from '@order/infra/mocks/use-cases/mock-add-item-to-order.use-case';
import { mockProductRepository } from '@product/infra/mocks/repositories/mock-product.repository';

describe('AddItemController', () => {
  const productRepository = new mockProductRepository();
  const repository = new mockOrderRepository();
  const useCase = new mockAddItemToOrderUseCase(repository, productRepository);
  const controller = new AddItemToOrderController(useCase);

  it('should return correct data', async () => {
    const result = await controller.addItemToOrder({
      color: 'red',
      productId: '123',
      quantity: 1,
    });

    expect(result!.success).toBe(true);
  });

  it('should return error if the use case return an error', async () => {
    jest.spyOn(repository, 'save').mockRejectedValue(() => {
      throw new Error('Error');
    });

    expect(
      controller.addItemToOrder({
        color: 'red',
        productId: '123',
        quantity: 1,
      }),
    ).rejects.toThrow('Error');
  });
});
