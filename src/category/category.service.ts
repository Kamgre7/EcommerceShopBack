import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Response } from 'express';
import * as path from 'path';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  CategoryFilterResponse,
  CreateCategoryResponse,
  MulterDiskUploadedFiles,
} from '../types';
import { ProductCategoryEntity } from './entities/category.entity';
import { categoryFilter } from '../utils/category-filter';
import { storageDir } from '../utils/storage';

@Injectable()
export class CategoryService {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
    files: MulterDiskUploadedFiles,
  ): Promise<CreateCategoryResponse> {
    const { name, description } = createCategoryDto;
    const photo = files?.photo?.[0] ?? null;

    const duplicatedCategory = await ProductCategoryEntity.findOne({
      where: {
        name,
      },
    });

    if (duplicatedCategory) {
      return {
        isSuccess: false,
        message: 'A category with that name already exists!',
      };
    }

    try {
      const category = new ProductCategoryEntity();
      category.name = name;
      category.description = description;

      if (photo) {
        category.photoFileName = photo.filename;
      }

      await category.save();

      return categoryFilter(category);
    } catch (e) {
      try {
        if (photo) {
          fs.unlinkSync(photo.path);
        }
      } catch (err) {}

      return {
        isSuccess: false,
        message: e.message,
      };
    }
  }

  async findAllCategories(): Promise<CategoryFilterResponse[]> {
    const categories = await ProductCategoryEntity.find();
    return categories.map((category) => categoryFilter(category));
  }

  async findOneCategory(id: string): Promise<ProductCategoryEntity | null> {
    const category = await ProductCategoryEntity.findOne({
      where: { id },
    });

    return !category ? null : category;
  }

  async findCategoryPhoto(categoryId: string, res: Response): Promise<void> {
    try {
      const category = await ProductCategoryEntity.findOne({
        where: { id: categoryId },
      });

      if (!category) {
        throw new Error('No object found!');
      }

      if (!category.photoFileName) {
        throw new Error('No photo in this category!');
      }

      res.sendFile(category.photoFileName, {
        root: path.join(storageDir(), 'category-photo'),
      });
    } catch (e) {
      res.json({
        isSuccess: false,
        message: e.message,
      });
    }
  }
}
