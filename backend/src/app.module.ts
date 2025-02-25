import { PrismaModule } from '@libs/prisma.module';
import { Module } from '@nestjs/common';
import { OrderModule } from '@order/infra/modules/order.module';
import { UserModule } from '@user/infra/modules/user.module';
import { ProductModule } from 'src/product/infra/modules/product.module';

@Module({
  imports: [PrismaModule, ProductModule, OrderModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
