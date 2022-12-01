import { ApiProperty } from '@nestjs/swagger';
import {
  categoryApiInformation,
  productApiInformation,
} from '../../utils/api-messages';

export class ProductFilterResponseProp {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: productApiInformation.productId,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: productApiInformation.name,
  })
  name: string;

  @ApiProperty({
    type: String,
    example: categoryApiInformation.categoryId,
  })
  category: string;

  @ApiProperty({
    type: Number,
    example: productApiInformation.price,
  })
  price: number;

  @ApiProperty({
    type: Number,
    example: productApiInformation.quantity,
  })
  quantity: number;

  @ApiProperty({
    type: String,
    example: productApiInformation.description,
  })
  description: string;

  @ApiProperty({
    type: String,
    example: productApiInformation.sku,
  })
  sku: string;

  @ApiProperty({
    type: Number,
    example: productApiInformation.boughtCounter,
  })
  boughtCounter: number;
}
