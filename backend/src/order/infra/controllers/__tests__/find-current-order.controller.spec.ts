import { mockOrderRepository } from '@order/infra/mocks/repositories/mock-order.repository';

describe('FindCurrentOrderController', () => {
  const repository = new mockOrderRepository();
  const useCase = new mockFi(repository);

  it('should return correct data', async () => {
    const result = await controller.findCurrentOrder();

    expect(result).toBe(defaultOrder);
  });

  it('should return error if the use case return an error', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error('Error'));

    expect(() => controller.findCurrentOrder()).rejects.toThrow('Error');
  });
});
