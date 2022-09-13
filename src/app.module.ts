import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    forwardRef(() => DatabaseModule),
    forwardRef(() => ProductModule),
    forwardRef(() => CategoryModule),
    forwardRef(() => BasketModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
