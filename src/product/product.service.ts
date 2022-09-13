import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { MulterDiskUploadedFiles } from '../types';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) {}

  async createNewProduct(
    createProductDto: CreateProductDto,
    files: MulterDiskUploadedFiles,
  ): Promise<any> {
    const photo = files?.photo?.[0] ?? null;
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );

    if (!category) {
      return { isSuccess: false };
    }

    try {
      const productItem = new ProductEntity();
      productItem.name = createProductDto.name;
      productItem.description = createProductDto.description;
      productItem.price = createProductDto.price;
      productItem.quantity = createProductDto.quantity;
      productItem.sku = createProductDto.sku;

      if (photo) {
        productItem.photoFileName = photo.filename;
      }

      await productItem.save();

      productItem.category = category;

      await productItem.save();

      return productItem;
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
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
