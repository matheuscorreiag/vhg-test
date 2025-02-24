import { CreateOrderController } from '@order/infra/controllers/create-order.controller';
import { defaultOrder } from '@order/infra/mocks';
import { mockCreateOrderUseCase } from '@order/infra/mocks/use-cases/mock-create-order-use-case';

describe('CreateOrderController', () => {
  const useCase = new mockCreateOrderUseCase();
  const controller = new CreateOrderController(useCase);

  it('should return correct data', async () => {
    const result = await controller.createOrder(defaultOrder);

    expect(result.state).toBe(defaultOrder.state);
  });

  it('should return error if the use case return an error', async () => {
    jest.spyOn(useCase, 'execute').mockImplementation(() => {
      throw new Error('Error');
    });

    expect(controller.createOrder(defaultOrder)).rejects.toThrow('Error');
  });
});
