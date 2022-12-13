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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiProduces,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  categoryApiInformation,
  categoryApiMessage,
  productApiInformation,
  productApiMessage,
  userApiMessage,
} from '../utils/api-messages';
import {
  EditProductDtoProp,
  EditProductInfoProp,
  ProductFilterResponseProp,
  RemoveProductResponseProp,
  StorageProductObjectDto,
} from './props/product.props';

@ApiTags('Product')
@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCookieAuth('jwt')
  @ApiCreatedResponse({
    description: productApiMessage.createProduct,
    type: ProductFilterResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiForbiddenResponse({
    description: productApiMessage.forbiddenUserCreateProduct,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: StorageProductObjectDto,
    required: true,
  })
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

  @ApiCookieAuth('jwt')
  @ApiCreatedResponse({
    description: productApiMessage.editProduct,
    type: EditProductInfoProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiForbiddenResponse({
    description: productApiMessage.forbiddenUserEditProduct,
  })
  @ApiBody({
    type: EditProductDtoProp,
    required: true,
  })
  @Patch('/edit')
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  editProductInfo(
    @Body() editProductInfoDto: EditProductInfoDto,
  ): Promise<EditProductInfoResponse> {
    return this.productService.editProductInfo(editProductInfoDto);
  }

  @ApiOkResponse({
    description: productApiMessage.findAllProducts,
    isArray: true,
    type: ProductFilterResponseProp,
  })
  @ApiBadRequestResponse({
    description: productApiMessage.findAllProductsBadReq,
  })
  @Get('/')
  findAllProducts(): Promise<ProductFilterResponse[]> {
    return this.productService.findAllProducts();
  }

  @ApiOkResponse({
    description: productApiMessage.findBestSoldProduct,
    isArray: true,
    type: ProductFilterResponseProp,
  })
  @ApiBadRequestResponse({
    description: productApiMessage.findBestSoldProductBadReq,
  })
  @Get('/ranking')
  findBestSoldProduct(): Promise<ProductFilterResponse[]> {
    return this.productService.findBestSoldProduct();
  }

  @ApiOkResponse({
    description: productApiMessage.findProductByCategory,
    type: ProductFilterResponseProp,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: productApiMessage.findProductByCategoryBadReq,
  })
  @ApiParam({
    name: 'categoryId',
    type: String,
    example: categoryApiInformation.categoryId,
    description: categoryApiMessage.uniqueCategoryId,
    required: true,
  })
  @Get('/category/:categoryId')
  findAllProductByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<FindProductByCategoryResponse> {
    return this.productService.findAllProductByCategory(categoryId);
  }

  @ApiOkResponse({
    description: productApiMessage.findProductBySearchTerm,
    type: ProductFilterResponseProp,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: productApiMessage.findProductBySearchTermBadReq,
  })
  @ApiParam({
    name: 'searchTerm',
    type: String,
    example: productApiInformation.findBySearchTerm,
    description: productApiMessage.searchTerm,
    required: true,
  })
  @Get('/find/:searchTerm')
  findAllProductsBySearchTerm(
    @Param('searchTerm') searchTerm: string,
  ): Promise<ProductFilterResponse[]> {
    return this.productService.findAllProductsBySearchTerm(searchTerm);
  }

  @ApiOkResponse({
    description: productApiMessage.findProductById,
    type: ProductEntity,
  })
  @ApiBadRequestResponse({
    description: productApiMessage.findProductByIdBadReq,
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: productApiInformation.productId,
    description: productApiMessage.uniqueProductId,
    required: true,
  })
  @Get('/:id')
  findOneProduct(@Param('id') id: string): Promise<ProductEntity | null> {
    return this.productService.findOneProduct(id);
  }

  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
    description: productApiMessage.photoFile,
  })
  @ApiProduces('image/*')
  @ApiParam({
    name: 'productId',
    type: String,
    example: productApiInformation.productId,
    description: productApiMessage.uniqueProductId,
    required: true,
  })
  @ApiBadRequestResponse({
    description: productApiMessage.photoFileBadReq,
  })
  @Get('/photo/:productId')
  findProductPhoto(
    @Param('productId') productId: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.productService.findProductPhoto(productId, res);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: productApiMessage.removeProduct,
    type: RemoveProductResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiForbiddenResponse({
    description: userApiMessage.forbiddenUserDeleteProduct,
  })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    example: productApiInformation.productId,
    description: productApiMessage.uniqueProductId,
    required: true,
  })
  @Delete('/:id')
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  removeProduct(@Param('id') id: string): Promise<RemoveProductResponse> {
    return this.productService.removeProduct(id);
  }
}
