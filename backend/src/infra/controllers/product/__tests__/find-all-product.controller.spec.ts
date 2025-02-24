import { FindAllProductController } from '@infra/controllers/product/find-all-product.controller';
import { mockFindAllProductUseCase } from '@tests/mocks/product/mock-find-all-product-use-case';

describe('FindAllProductController', () => {
  const useCase = new mockFindAllProductUseCase();
  const controller = new FindAllProductController(useCase);

  it('should return correct data', async () => {
    const result = await controller.findAllProducts();

    expect(result).toHaveLength(1);
  });

  it('should return error if the use case return an error', async () => {
    jest.spyOn(useCase, 'execute').mockImplementation(() => {
      throw new Error('Error');
    });

    expect(() => controller.findAllProducts()).rejects.toThrow('Error');
  });
});
