import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import {
  CreateProductResponse,
  FindProductByCategoryResponse,
  MulterDiskUploadedFiles,
  ProductFilterResponse,
  RemoveProductResponse,
} from '../types';
import { CategoryService } from '../category/category.service';
import { ProductInventoryEntity } from './entities/product-inventory.entity';
import { productFilter } from '../utils/product-filter';
import { BasketService } from '../basket/basket.service';
import { storageDir } from '../utils/storage';
import { Like } from 'typeorm';
import { ProductCategoryEntity } from '../category/entities/category.entity';
import { EditProductInfoDto } from './dto/edit-product-info.dto';

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

    const duplicatedProduct = await ProductEntity.findOne({
      where: {
        name,
      },
    });

    if (!category) {
      return {
        isSuccess: false,
        message: "Category with that name doesn't exist",
      };
    }

    if (duplicatedProduct) {
      return {
        isSuccess: false,
        message: 'Product with that name already exists',
      };
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

      return {
        isSuccess: false,
        message: e.message,
      };
    }
  }

  async findAllProducts(): Promise<ProductFilterResponse[]> {
    const products = await ProductEntity.find({
      relations: ['productInventory', 'category'],
    });

    return products.map((product) => productFilter(product));
  }

  async findAllProductByCategory(
    categoryName: string,
  ): Promise<FindProductByCategoryResponse> {
    const category = await ProductCategoryEntity.findOne({
      where: {
        name: Like(`%${categoryName}%`),
      },
    });

    if (!category) {
      return {
        isSuccess: false,
        message: "Can't find a products with this category",
      };
    }

    const products = await ProductEntity.find({
      where: {
        category: category.valueOf(),
      },
      relations: ['productInventory', 'category'],
    });

    return products.map((product) => productFilter(product));
  }

  async findAllProductsBySearchTerm(
    searchTerm: string,
  ): Promise<ProductFilterResponse[]> {
    const products = await ProductEntity.find({
      where: {
        name: Like(`%${searchTerm}%`),
      },
      relations: ['category'],
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

  async updateProductInventory(id: string, boughtQuantity): Promise<void> {
    const product = await this.findOneProduct(id);

    const productInventory = await ProductInventoryEntity.findOne({
      where: {
        id: product.productInventory.id,
      },
    });

    productInventory.quantity -= boughtQuantity;
    await productInventory.save();
  }

  async updateProductBoughtCounter(id: string, boughtQuantity): Promise<void> {
    const product = await this.findOneProduct(id);
    product.boughtCounter += boughtQuantity;
    await product.save();
  }

  async findBestSoldProduct(): Promise<ProductFilterResponse[]> {
    const topProducts = await ProductEntity.find({
      order: {
        boughtCounter: 'DESC',
      },
      relations: ['category'],
      skip: 0,
      take: 3,
    });

    return topProducts.map((product) => productFilter(product));
  }

  async editProductInfo(editProductInfoDto: EditProductInfoDto) {
    const product = await this.findOneProduct(editProductInfoDto.id);
    const productInventory = await ProductInventoryEntity.findOne({
      where: {
        id: product.productInventory.id,
      },
    });
    const category = await this.categoryService.findOneCategory(
      editProductInfoDto.categoryId,
    );

    if (productInventory === null || category === null) {
      return {
        isSuccess: false,
        message: 'Cannot find product or category',
      };
    }

    for (const [key, value] of Object.entries(editProductInfoDto)) {
      product[key] = value;
    }

    product.modifiedAt = new Date();
    await product.save();

    product.category = category;
    await product.save();

    productInventory.quantity = editProductInfoDto.quantity;
    await productInventory.save();

    return {
      isSuccess: true,
      message: 'Product updated successfully',
    };
  }

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

  async findProductPhoto(productId: string, res: Response): Promise<void> {
    try {
      const product = await ProductEntity.findOne({
        where: { id: productId },
      });

      if (!product) {
        throw new Error('No object found!');
      }

      if (!product.photoFileName) {
        throw new Error('No photo in this category!');
      }

      res.sendFile(product.photoFileName, {
        root: path.join(storageDir(), 'product-photo'),
      });
    } catch (e) {
      res.json({
        isSuccess: false,
        message: e.message,
      });
    }
  }
}
