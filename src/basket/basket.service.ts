import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { ProductService } from '../product/product.service';
import { BasketEntity } from './entities/basket.entity';
import { AddToBasketResponse, BasketFilterResponse } from '../types';
import { basketFilter } from '../utils/basketFilter';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}

  async addToBasket(
    createBasketDto: CreateBasketDto,
  ): Promise<AddToBasketResponse> {
    const { quantity, productId } = createBasketDto;
    const product = await this.productService.findOneProduct(productId);

    if (!product || product.productInventory.quantity < quantity) {
      return { isSuccess: false };
    }

    const basket = new BasketEntity();
    basket.quantity = quantity;
    await basket.save();

    basket.product = product;
    await basket.save();

    return { isSuccess: true, id: basket.id };
  }

  async showBasket(/*id: string*/) {
    const items: BasketFilterResponse[] = (
      await BasketEntity.find({
        relations: ['product'],
      })
    ).map((item) => basketFilter(item));

    const singleBasket: BasketFilterResponse[] = [];

    items.forEach((item) => {
      const findExistingItem = singleBasket.findIndex(
        (itemActuallyInBasket) =>
          item.product.id === itemActuallyInBasket.product.id,
      );

      if (findExistingItem !== -1) {
        singleBasket[findExistingItem].quantity += item.quantity;
      } else {
        singleBasket.push(item);
      }
    });

    return singleBasket;
  }

  async getTotalPrice(/*id: string*/): Promise<number> {
    const basketItems = await this.showBasket();

    return basketItems.reduce(
      (prev, curr) => prev + curr.quantity * curr.product.price,
      0,
    );
  }

  /*
  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }
*/

  removeItem(id: string) {
    return `This action removes a #${id} basket`;
  }

  clearBasket(id: string) {
    return `This action removes a all items in basket ${id}`;
  }
}
