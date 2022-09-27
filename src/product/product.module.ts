import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '../category/category.module';
import { BasketModule } from '../basket/basket.module';

@Module({
  imports: [forwardRef(() => CategoryModule), forwardRef(() => BasketModule)],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
