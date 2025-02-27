import { FindCurrentOrderController } from '@order/infra/controllers/find-current-order.controller';
import { mockRequest } from '@order/infra/mocks';
import { mockOrderRepository } from '@order/infra/mocks/repositories/mock-order.repository';
import { mockFindCurrentOrderUseCase } from '@order/infra/mocks/use-cases/mock-find-current-order.use-case';
import { Request } from 'express';

describe('FindCurrentOrderController', () => {
  const repository = new mockOrderRepository();
  const useCase = new mockFindCurrentOrderUseCase(repository);
  const controller = new FindCurrentOrderController(useCase);

  it('should return correct data', async () => {
    const result = await controller.findCurrentOrder(mockRequest as Request);

    expect(result).toBeDefined();
  });

  it('should return error if the use case return an error', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error('Error'));

    expect(() =>
      controller.findCurrentOrder(mockRequest as Request),
    ).rejects.toThrow('Error');
  });
});
