import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { ProductService } from '../product/product.service';
import { BasketEntity } from './entities/basket.entity';
import {
  AddToBasketResponse,
  BasketFilterResponse,
  RemoveProductFromBasket,
} from '../types';
import { basketFilter } from '../utils/basket-filter';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}

  async addToBasket(
    createBasketDto: CreateBasketDto,
    user: UserEntity,
  ): Promise<AddToBasketResponse> {
    const { quantity, productId } = createBasketDto;
    const product = await this.productService.findOneProduct(productId);

    if (!product || product.productInventory.quantity < quantity) {
      return {
        isSuccess: false,
        message: "Product doesn't exist or isn't in stock in this quantity",
      };
    }

    const items: BasketEntity[] = await BasketEntity.find({
      where: {
        user: user.valueOf(),
      },
      relations: ['product'],
    });

    const existingProductBasket = items.find(
      (itemActuallyInBasket) => itemActuallyInBasket.product.id === productId,
    );

    if (!!existingProductBasket) {
      if (
        product.productInventory.quantity <
        (existingProductBasket.quantity += quantity)
      ) {
        return {
          isSuccess: false,
          message: 'Not enough stock quantity of product',
        };
      }

      existingProductBasket.quantity += quantity;
      await existingProductBasket.save();

      return { isSuccess: true, id: existingProductBasket.id };
    } else {
      const basket = new BasketEntity();
      basket.quantity = quantity;
      await basket.save();

      basket.product = product;
      basket.user = user;
      await basket.save();

      return { isSuccess: true, id: basket.id };
    }
  }

  async showBasket(user: UserEntity): Promise<BasketFilterResponse[]> {
    return (
      await BasketEntity.find({
        where: {
          user: user.valueOf(),
        },
        relations: ['product'],
      })
    ).map((item) => basketFilter(item));
  }

  async getTotalPrice(user: UserEntity): Promise<number> {
    const basketItems = await this.showBasket(user);

    return basketItems.reduce(
      (prev, curr) => prev + curr.quantity * curr.product.price,
      0,
    );
  }

  async removeItem(
    basketId: string,
    user: UserEntity,
  ): Promise<RemoveProductFromBasket> {
    const basketItem = await BasketEntity.findOne({
      where: {
        id: basketId,
        user: user.valueOf(),
      },
      relations: ['user'],
    });

    if (!basketItem) {
      return { isSuccess: false };
    }

    await basketItem.remove();
    return { isSuccess: true };
  }

  async clearBasket(user: UserEntity): Promise<RemoveProductFromBasket> {
    await BasketEntity.delete({
      user: user.valueOf(),
    });

    return {
      isSuccess: true,
    };
  }
}
