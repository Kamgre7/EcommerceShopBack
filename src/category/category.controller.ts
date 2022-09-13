import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';
import * as path from 'path';
import { MulterDiskUploadedFiles } from '../types';
import { ProductCategoryEntity } from './entities/category.entity';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'photo',
          maxCount: 1,
        },
      ],
      {
        storage: multerStorage(path.join(storageDir(), 'category-photo')),
      },
    ),
  )
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<any> {
    return this.categoryService.createCategory(createCategoryDto, files);
  }

  @Get('/')
  findAllCategories(): Promise<ProductCategoryEntity[]> {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  findOneCategory(@Param('id') id: string): Promise<ProductCategoryEntity> {
    return this.categoryService.findOne(id);
  }

  /*  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }*/
}
