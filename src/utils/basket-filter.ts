import { BasketEntity } from '../basket/entities/basket.entity';
import { productFilter } from './product-filter';
import { BasketFilterResponse } from '../types';
import { ProductEntity } from '../product/entities/product.entity';

export const basketFilter = async (
  basketItem: BasketEntity,
): Promise<BasketFilterResponse> => {
  const { id, quantity, product } = basketItem;
  const productInfo = await ProductEntity.findOne({
    where: {
      id: product.id,
    },
    relations: ['productInventory', 'category'],
  });

  const filteredProduct = productFilter(productInfo);

  return {
    id,
    quantity,
    product: { ...filteredProduct },
  };
};
