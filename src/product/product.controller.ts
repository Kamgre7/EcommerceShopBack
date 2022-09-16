import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';
import {
  CreateProductResponse,
  MulterDiskUploadedFiles,
  ProductFilterResponse,
  RemoveProductResponse,
} from '../types';
import { ProductEntity } from './entities/product.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
  findOneProduct(@Param('id') id: string): Promise<ProductEntity | null> {
    return this.productService.findOneProduct(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  removeProduct(@Param('id') id: string): Promise<RemoveProductResponse> {
    return this.productService.removeProduct(id);
  }

  @Get('/photo/:productId')
  findProductPhoto(
    @Param('productId') productId: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.productService.findProductPhoto(productId, res);
  }
}
