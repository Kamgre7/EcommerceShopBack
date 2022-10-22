import { forwardRef, Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { BasketModule } from '../basket/basket.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    forwardRef(() => BasketModule),
    forwardRef(() => UserModule),
    forwardRef(() => ProductModule),
    forwardRef(() => MailModule),
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
