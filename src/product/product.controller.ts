import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '../utils/storage';
import {
  CreateProductResponse,
  EditProductInfoResponse,
  FindProductByCategoryResponse,
  MulterDiskUploadedFiles,
  ProductFilterResponse,
  RemoveProductResponse,
  UserRole,
} from '../types';
import { ProductEntity } from './entities/product.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { EditProductInfoDto } from './dto/edit-product-info.dto';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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

  @Patch('/edit')
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  editProductInfo(
    @Body() editProductInfoDto: EditProductInfoDto,
  ): Promise<EditProductInfoResponse> {
    return this.productService.editProductInfo(editProductInfoDto);
  }

  @Get('/')
  findAllProducts(): Promise<ProductFilterResponse[]> {
    return this.productService.findAllProducts();
  }

  @Get('/ranking')
  findBestSoldProduct(): Promise<ProductFilterResponse[]> {
    return this.productService.findBestSoldProduct();
  }

  @Get('/category/:categoryName')
  findAllProductByCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<FindProductByCategoryResponse> {
    return this.productService.findAllProductByCategory(categoryName);
  }

  @Get('/find/:searchTerm')
  findAllProductsBySearchTerm(
    @Param('searchTerm') searchTerm: string,
  ): Promise<ProductFilterResponse[]> {
    return this.productService.findAllProductsBySearchTerm(searchTerm);
  }

  @Get('/:id')
  findOneProduct(@Param('id') id: string): Promise<ProductEntity | null> {
    return this.productService.findOneProduct(id);
  }

  @Get('/photo/:productId')
  findProductPhoto(
    @Param('productId') productId: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.productService.findProductPhoto(productId, res);
  }

  @Delete('/:id')
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  removeProduct(@Param('id') id: string): Promise<RemoveProductResponse> {
    return this.productService.removeProduct(id);
  }
}
