import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/infra/modules/product.module';

@Module({
  imports: [ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
