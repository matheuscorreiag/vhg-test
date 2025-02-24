export abstract class ReviewProductUseCase {
  static TOKEN = 'ReviewProductUseCaseToken';

  abstract execute(productId: string, rating: number): Promise<void>;
}
