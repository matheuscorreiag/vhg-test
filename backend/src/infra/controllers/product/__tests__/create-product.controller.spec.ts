import { CreateProductController } from '@infra/controllers/product/create-product.controller';
import { defaultProduct } from '@tests/mocks/product';
import { mockCreateProductUseCase } from '@tests/mocks/product/mock-create-product-use-case';

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
