import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailModule } from '../mail/mail.module';
import { BasketModule } from '../basket/basket.module';
import { CheckoutModule } from '../checkout/checkout.module';

@Module({
  imports: [
    forwardRef(() => MailModule),
    forwardRef(() => BasketModule),
    forwardRef(() => CheckoutModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
