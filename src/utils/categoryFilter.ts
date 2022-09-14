import { ProductCategoryEntity } from '../category/entities/category.entity';
import { CategoryFilterResponse } from '../types';

export const categoryFilter = (
  category: ProductCategoryEntity,
): CategoryFilterResponse => {
  const { id, name, photoFileName, description } = category;
  return { id, name, photoFileName, description };
};
