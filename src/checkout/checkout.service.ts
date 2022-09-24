import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { BasketService } from '../basket/basket.service';
import { CheckoutTotalPriceResponse } from '../types';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { creditCardVerification } from '../utils/credit-card-verification';
import { ProductService } from '../product/product.service';

@Injectable()
export class CheckoutService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}

  async placeOrder(createCheckoutDto: CreateCheckoutDto, user: UserEntity) {
    const { userAddressId, creditCard, creditCardCvc, expDate } =
      createCheckoutDto;
    const userAddress = await this.userService.findOneUserAddress(
      userAddressId,
      user,
    );

    if (!userAddress) {
      return {
        isSuccess: false,
        message: 'Address not found!',
      };
    }

    if (!creditCardVerification(creditCard, creditCardCvc, expDate)) {
      return {
        isSuccess: false,
        message: 'Wrong credit card!',
      };
    }

    const basket = await this.basketService.showBasket(user);

    for await (const item of basket) {
      await this.productService.updateProductInventory(
        item.product.id,
        item.quantity,
      );
      await this.productService.updateProductBoughtCounter(
        item.product.id,
        item.quantity,
      );

      await this.basketService.clearBasket(user);
    }

    return {
      isSuccess: true,
      message: 'Order was placed correctly',
    };
  }

  async basketCheckout(user): Promise<CheckoutTotalPriceResponse> {
    return await this.basketService.getTotalPrice(user);
  }
}
