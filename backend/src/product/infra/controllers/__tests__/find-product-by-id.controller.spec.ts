import { FindProductByIdController } from '@product/infra/controllers/find-product-by-id-controller';
import { mockProductRepository } from '@product/infra/mocks/repositories/mock-product.repository';
import { mockFindProductByIdUseCase } from '@product/infra/mocks/use-cases/mock-find-product-by-id.use-case';

describe('FindProductByIdController', () => {
  const repository = new mockProductRepository();
  const useCase = new mockFindProductByIdUseCase(repository);
  const controller = new FindProductByIdController(useCase);
  it('should return correct data', async () => {
    const result = await controller.findProductById('123');

    expect(result).toBeDefined();
  });

  it('should return error if the use case return an error', async () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error('Error'));

    expect(() => controller.findProductById('123')).rejects.toThrow('Error');
  });
});
