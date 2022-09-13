import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MulterDiskUploadedFiles } from '../types';
import * as fs from 'fs';
import { ProductCategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  async create(
    createCategoryDto: CreateCategoryDto,
    files: MulterDiskUploadedFiles,
  ): Promise<any> {
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

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
