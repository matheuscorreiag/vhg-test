import { defaultOrder } from '@order/infra/mocks';
import { mockOrderRepository } from '@order/infra/mocks/repositories/mock-order.repository';
import { mockCreateOrderUseCase } from '@order/infra/mocks/use-cases/mock-create-order.use-case';
import { mockProductRepository } from '@product/infra/mocks/repositories/mock-product.repository';

describe('CreateOrderController', () => {
  const productRepository = new mockProductRepository();
  const repository = new mockOrderRepository();
  const useCase = new mockCreateOrderUseCase(repository, productRepository);
  const controller = new CreateOrderController(useCase);

  it('should return correct data', async () => {
    const result = await controller.createOrder(defaultOrder);

    expect(result!.success).toBe(true);
  });

  it('should return error if the use case return an error', async () => {
    jest.spyOn(repository, 'save').mockRejectedValue(() => {
      throw new Error('Error');
    });

    expect(controller.createOrder(defaultOrder)).rejects.toThrow('Error');
  });
});
