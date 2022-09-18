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
    photoFileName,
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
    photoFileName,
    description,
    category: category.name,
  };
};
