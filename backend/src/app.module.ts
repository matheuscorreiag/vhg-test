import { Module } from '@nestjs/common';
import { ProductModule } from '@infra/modules/product.module';

@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
