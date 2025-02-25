import { FindAllProductController } from '@product/infra/controllers/find-all-product.controller';
import { mockProductRepository } from '@product/infra/mocks/repositories/mock-product.repository';
import { mockFindAllProductUseCase } from '@product/infra/mocks/use-cases/mock-find-all-product-use-case';

describe('FindAllProductController', () => {
  const repository = new mockProductRepository();
  const useCase = new mockFindAllProductUseCase(repository);
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
