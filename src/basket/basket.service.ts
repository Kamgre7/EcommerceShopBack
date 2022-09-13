import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ProductService))
    private productService: ProductService,
  ) {}

  addToBasket(createBasketDto: CreateBasketDto) {
    return 'This action adds a new basket';
  }

  findAll() {
    return `This action returns all basket`;
  }

  showBasket(id: string) {
    return `This action returns a #${id} basket`;
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
