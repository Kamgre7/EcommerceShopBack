import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { MulterDiskUploadedFiles, RemoveProductResponse } from '../types';
import { CategoryService } from '../category/category.service';
import { ProductInventoryEntity } from './entities/product-inventory.entity';

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
      productItem.sku = createProductDto.sku;

      const productInventory = new ProductInventoryEntity();
      productInventory.quantity = createProductDto.quantity;

      if (photo) {
        productItem.photoFileName = photo.filename;
      }

      await productItem.save();
      await productInventory.save();

      productItem.quantity = productInventory;
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

  async findAllProducts(): Promise<ProductEntity[]> {
    return await ProductEntity.find({
      relations: ['quantity', 'category'],
    });
  }

  async findOneProduct(id: string): Promise<ProductEntity | null> {
    const product = await ProductEntity.findOne({
      where: {
        id,
      },
      relations: ['quantity', 'category'],
    });

    return product !== null ? product : null;
  }

  /*  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }*/

  async removeProduct(id: string): Promise<RemoveProductResponse> {
    const product = await ProductEntity.findOne({
      where: {
        id,
      },
      relations: ['quantity'],
    });

    const productInventory = await ProductInventoryEntity.findOne({
      where: {
        id: product.quantity.id,
      },
    });

    if (!product || !productInventory) {
      return {
        isSuccess: false,
      };
    }

    await product.remove();
    await productInventory.remove();

    return {
      isSuccess: true,
    };
  }
}
