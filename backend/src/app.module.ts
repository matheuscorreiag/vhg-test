import { Module } from '@nestjs/common';
import { OrderModule } from '@order/infra/modules/order.module';
import { ProductModule } from 'src/product/infra/modules/product.module';

@Module({
  imports: [ProductModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
