import { ProductCategoryEntity } from '../category/entities/category.entity';
import { CategoryFilterResponse } from '../types';

export const categoryFilter = (
  category: ProductCategoryEntity,
): CategoryFilterResponse => {
  const { id, name, description } = category;
  return { id, name, description };
};
