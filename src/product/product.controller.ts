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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MulterDiskUploadedFiles } from '../types';
import * as path from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
        storage: multerStorage(path.join(storageDir(), 'product-photo')),
      },
    ),
  )
  createNewProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: MulterDiskUploadedFiles,
  ): Promise<any> {
    return this.productService.createNewProduct(createProductDto, files);
  }

  @Get('/')
  findAll() {
    return this.productService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
