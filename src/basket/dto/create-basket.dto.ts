import { IsInt, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  basketApiInformation,
  productApiInformation,
} from '../../utils/api-messages';

export class CreateBasketDto {
  @IsUUID(4)
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: productApiInformation.productId,
  })
  productId: string;

  @IsInt()
  @Min(1)
  @Max(5000)
  @ApiProperty({
    type: Number,
    minimum: 1,
    maximum: 5000,
    example: basketApiInformation.itemQuantity,
  })
  quantity: number;
}
