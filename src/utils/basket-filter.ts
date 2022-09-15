import { BasketEntity } from '../basket/entities/basket.entity';
import { productFilter } from './product-filter';
import { BasketFilterResponse } from '../types';

export const basketFilter = (
  basketItem: BasketEntity,
): BasketFilterResponse => {
  const { id, quantity, product } = basketItem;
  const filteredProduct = productFilter(product);

  return {
    id,
    quantity,
    product: { ...filteredProduct },
  };
};
