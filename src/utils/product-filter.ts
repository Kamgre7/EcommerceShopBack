import { ProductEntity } from '../product/entities/product.entity';
import { ProductFilterResponse } from '../types';

export const productFilter = (
  product: ProductEntity,
): ProductFilterResponse => {
  const {
    id,
    name,
    price,
    productInventory,
    description,
    sku,
    boughtCounter,
    category,
  } = product;
  const { quantity } = productInventory;

  return {
    id,
    name,
    price,
    quantity,
    sku,
    boughtCounter,
    description,
    category: category.id,
  };
};
