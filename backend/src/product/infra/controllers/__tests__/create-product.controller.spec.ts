import { CreateProductController } from '@product/infra/controllers/create-product.controller';
import { defaultProduct } from '@product/infra/mocks';
import { mockProductRepository } from '@product/infra/mocks/repositories/mock-product.repository';
import { mockCreateProductUseCase } from '@product/infra/mocks/use-cases/mock-create-product.use-case';

describe('CreateProductController', () => {
  const repository = new mockProductRepository();
  const useCase = new mockCreateProductUseCase(repository);
  const controller = new CreateProductController(useCase);

  it('should return correct data', async () => {
    const result = await controller.createProduct(defaultProduct);

    expect(result).toHaveProperty('success', true);
  });

  it('should return error if the use case return an error', async () => {
    jest.spyOn(useCase, 'execute').mockImplementation(() => {
      throw new Error('Error');
    });

    expect(controller.createProduct(defaultProduct)).rejects.toThrow('Error');
  });
});
