import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import * as path from 'path';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';
import {
  CategoryFilterResponse,
  CreateCategoryResponse,
  MulterDiskUploadedFiles,
} from '../types';
import { ProductCategoryEntity } from './entities/category.entity';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
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
  ): Promise<CreateCategoryResponse> {
    return this.categoryService.createCategory(createCategoryDto, files);
  }

  @Get('/')
  findAllCategories(): Promise<CategoryFilterResponse[]> {
    return this.categoryService.findAllCategories();
  }

  @Get('/:id')
  findOneCategory(@Param('id') id: string): Promise<ProductCategoryEntity> {
    return this.categoryService.findOneCategory(id);
  }

  @Get('/photo/:categoryId')
  findCategoryPhoto(
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.categoryService.findCategoryPhoto(categoryId, res);
  }
}
