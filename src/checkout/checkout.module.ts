import { forwardRef, Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { BasketModule } from '../basket/basket.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    forwardRef(() => BasketModule),
    forwardRef(() => UserModule),
    forwardRef(() => ProductModule),
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
