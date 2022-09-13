import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MulterDiskUploadedFiles } from '../types';
import * as fs from 'fs';
import { ProductCategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
    files: MulterDiskUploadedFiles,
  ): Promise<ProductCategoryEntity> {
    const photo = files?.photo?.[0] ?? null;

    try {
      const category = new ProductCategoryEntity();
      category.name = createCategoryDto.name;
      category.description = createCategoryDto.description;

      if (photo) {
        category.photoFileName = photo.filename;
      }

      await category.save();

      return category;
    } catch (e) {
      try {
        if (photo) {
          fs.unlinkSync(photo.path);
        }
      } catch (err) {}

      throw e;
    }
  }

  async findAll(): Promise<ProductCategoryEntity[]> {
    return await ProductCategoryEntity.find();
  }

  async findOne(id: string): Promise<ProductCategoryEntity | null> {
    const category = await ProductCategoryEntity.findOne({
      where: { id },
    });

    if (!category) {
      return null;
    }
    return category;
  }

  /*  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: string): Promise<any> {
    return await ProductCategoryEntity.delete(id);
  }*/
}
