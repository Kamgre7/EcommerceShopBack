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
import * as path from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';
import { MulterDiskUploadedFiles } from '../types';
import { ProductEntity } from './entities/product.entity';

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
  ): Promise<ProductEntity> {
    return this.productService.createNewProduct(createProductDto, files);
  }

  @Get('/')
  findAllProducts(): Promise<ProductEntity[]> {
    return this.productService.findAllProducts();
  }

  @Get('/:id')
  findOneProduct(@Param('id') id: string): Promise<ProductEntity | null> {
    return this.productService.findOneProduct(id);
  }

  /* @Patch('/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }*/

  @Delete('/:id')
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id);
  }
}
