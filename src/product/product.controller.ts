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
import {
  CreateProductResponse,
  MulterDiskUploadedFiles,
  ProductFilterResponse,
  RemoveProductResponse,
} from '../types';

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
  ): Promise<CreateProductResponse> {
    return this.productService.createNewProduct(createProductDto, files);
  }

  @Get('/')
  findAllProducts(): Promise<ProductFilterResponse[]> {
    return this.productService.findAllProducts();
  }

  @Get('/ranking')
  findBestSoldProduct(): Promise<ProductFilterResponse[]> {
    return this.productService.findBestSoldProduct();
  }

  @Get('/:id')
  findOneProduct(
    @Param('id') id: string,
  ): Promise<ProductFilterResponse | null> {
    return this.productService.findOneProduct(id);
  }

  /* @Patch('/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }*/

  @Delete('/:id')
  removeProduct(@Param('id') id: string): Promise<RemoveProductResponse> {
    return this.productService.removeProduct(id);
  }
}
