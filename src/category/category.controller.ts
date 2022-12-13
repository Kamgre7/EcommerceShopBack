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
  UserRole,
} from '../types';
import { ProductCategoryEntity } from './entities/category.entity';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
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
  userApiMessage,
} from '../utils/api-messages';
import { CategoryFilterResponseProp } from './props/category.props';
import { StorageObjectDto } from './dto/storage-object.dto';

@ApiTags('Category')
@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiCookieAuth('jwt')
  @ApiCreatedResponse({
    description: categoryApiMessage.createCategory,
    type: CategoryFilterResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiForbiddenResponse({
    description: categoryApiMessage.forbiddenUser,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: StorageObjectDto,
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

  @ApiOkResponse({
    description: categoryApiMessage.findAllCategories,
    isArray: true,
    type: CategoryFilterResponseProp,
  })
  @ApiBadRequestResponse({
    description: categoryApiMessage.getAllCategoriesBadReq,
  })
  @Get('/')
  findAllCategories(): Promise<CategoryFilterResponse[]> {
    return this.categoryService.findAllCategories();
  }

  @ApiOkResponse({
    description: categoryApiMessage.findSingleCategory,
    type: ProductCategoryEntity,
  })
  @ApiBadRequestResponse({
    description: categoryApiMessage.getSingleCategoryBadReq,
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: categoryApiInformation.categoryId,
    description: categoryApiMessage.uniqueCategoryId,
    required: true,
  })
  @Get('/:id')
  findOneCategory(@Param('id') id: string): Promise<ProductCategoryEntity> {
    return this.categoryService.findOneCategory(id);
  }

  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @ApiProduces('image/*')
  @ApiParam({
    name: 'categoryId',
    type: String,
    example: categoryApiInformation.categoryId,
    description: categoryApiMessage.uniqueCategoryId,
    required: true,
  })
  @ApiBadRequestResponse({
    description: categoryApiMessage.getCategoryPhotoBadReq,
  })
  @Get('/photo/:categoryId')
  findCategoryPhoto(
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ): Promise<void> {
    return this.categoryService.findCategoryPhoto(categoryId, res);
  }
}
