import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { BasketService } from '../basket/basket.service';
import {
  CheckoutOrderHistoryResponse,
  CheckoutPlaceOrderResponse,
  CheckoutTotalPriceResponse,
  RemoveOrderHistoryResponse,
} from '../types';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { creditCardVerification } from '../utils/credit-card-verification';
import { ProductService } from '../product/product.service';
import { OrderEntity } from './entities/order.entity';
import { orderFilter } from '../utils/order-filter';
import { MailService } from '../mail/mail.service';

@Injectable()
export class CheckoutService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private readonly basketService: BasketService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    @Inject(forwardRef(() => MailService))
    private readonly mailService: MailService,
  ) {}

  async placeOrder(
    createCheckoutDto: CreateCheckoutDto,
    user: UserEntity,
  ): Promise<CheckoutPlaceOrderResponse> {
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
    const { totalPrice } = await this.basketCheckout(user);

    const newOrder = new OrderEntity();
    newOrder.total = totalPrice;
    newOrder.items = JSON.stringify(basket);

    await newOrder.save();

    newOrder.user = user;
    newOrder.address = userAddress;
    await newOrder.save();

    for await (const item of basket) {
      await this.productService.updateProductInventory(
        item.product.id,
        item.quantity,
      );

      await this.productService.updateProductBoughtCounter(
        item.product.id,
        item.quantity,
      );
    }

    await this.basketService.clearBasket(user);

    await this.mailService.sendUserOrderMail(
      user.email,
      'Ecommerce shop - Order confirmation',
      {
        firstName: user.firstName,
        lastName: user.lastName,
        orderId: newOrder.id,
        totalPrice,
        address: userAddress,
        basket,
      },
    );

    return {
      isSuccess: true,
      message: 'Order was placed correctly',
    };
  }

  async basketCheckout(user): Promise<CheckoutTotalPriceResponse> {
    return await this.basketService.getTotalPrice(user);
  }

  async orderHistory(
    user: UserEntity,
  ): Promise<CheckoutOrderHistoryResponse[]> {
    const order = await OrderEntity.find({
      where: {
        user: user.valueOf(),
      },
      relations: ['address'],
    });
    return order.map((item) => orderFilter(item));
  }

  async singleOrderInfo(
    orderId: string,
    user: UserEntity,
  ): Promise<CheckoutOrderHistoryResponse> {
    const order = await OrderEntity.findOne({
      where: {
        id: orderId,
        user: user.valueOf(),
      },
      relations: ['address'],
    });

    return order ? orderFilter(order) : null;
  }

  async clearOrderHistory(
    user: UserEntity,
  ): Promise<RemoveOrderHistoryResponse> {
    await OrderEntity.delete({
      user: user.valueOf(),
    });

    return {
      isSuccess: true,
    };
  }
}
