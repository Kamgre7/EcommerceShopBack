import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import {
  CreateProductResponse,
  FindOneProductResponse,
  MulterDiskUploadedFiles,
  ProductFilterResponse,
  RemoveProductResponse,
} from '../types';
import { CategoryService } from '../category/category.service';
import { ProductInventoryEntity } from './entities/product-inventory.entity';
import { productFilter } from '../utils/productFilter';
import { BasketService } from '../basket/basket.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  async createNewProduct(
    createProductDto: CreateProductDto,
    files: MulterDiskUploadedFiles,
  ): Promise<CreateProductResponse> {
    const { name, sku, price, quantity, description, categoryId } =
      createProductDto;
    const photo = files?.photo?.[0] ?? null;
    const category = await this.categoryService.findOneCategory(categoryId);

    if (!category) {
      return { isSuccess: false };
    }

    try {
      const productItem = new ProductEntity();
      productItem.name = name;
      productItem.description = description;
      productItem.price = price;
      productItem.sku = sku;

      const productInventory = new ProductInventoryEntity();
      productInventory.quantity = quantity;

      if (photo) {
        productItem.photoFileName = photo.filename;
      }

      await productItem.save();
      await productInventory.save();

      productItem.productInventory = productInventory;
      productItem.category = category;

      await productItem.save();

      return productFilter(productItem);
    } catch (e) {
      try {
        if (photo) {
          fs.unlinkSync(photo.path);
        }
      } catch (err) {}

      throw e;
    }
  }

  async findAllProducts(): Promise<ProductFilterResponse[]> {
    const products = await ProductEntity.find({
      relations: ['productInventory', 'category'],
    });

    return products.map((product) => productFilter(product));
  }

  async findOneProduct(id: string): Promise<ProductEntity | null> {
    const product = await ProductEntity.findOne({
      where: {
        id,
      },
      relations: ['productInventory', 'category'],
    });

    return product !== null ? product : null;
  }

  async findBestSoldProduct(): Promise<ProductFilterResponse[]> {
    const topProducts = await ProductEntity.find({
      order: {
        boughtCounter: 'DESC',
      },
      skip: 0,
      take: 2,
    });

    return topProducts.map((product) => productFilter(product));
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
        id: product.productInventory.id,
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
