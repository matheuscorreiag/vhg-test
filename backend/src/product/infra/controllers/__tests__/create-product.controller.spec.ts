import { CreateProductController } from '@product/infra/controllers/create-product.controller';
import { defaultProduct } from '@product/infra/mocks';
import { mockCreateProductUseCase } from '@product/infra/mocks/use-cases/mock-create-product-use-case';

describe('CreateProductController', () => {
  const useCase = new mockCreateProductUseCase();
  const controller = new CreateProductController(useCase);

  it('should return correct data', async () => {
    const result = await controller.createProduct(defaultProduct);

    expect(result.name).toBe(defaultProduct.name);
  });

  it('should return error if the use case return an error', async () => {
    jest.spyOn(useCase, 'execute').mockImplementation(() => {
      throw new Error('Error');
    });

    expect(controller.createProduct(defaultProduct)).rejects.toThrow('Error');
  });
});
