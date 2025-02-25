import { Product } from '@product/domain/entities/product';

export abstract class FindProductByIdUseCase {
  static TOKEN = 'FindProductByIdUseCaseToken';

  abstract execute(productId: string): Promise<Product>;
}
