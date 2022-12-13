import { IsInt, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { basketApiInformation } from '../../utils/api-messages';

export class UpdateBasketDto {
  @IsUUID(4)
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: basketApiInformation.basketId,
  })
  basketId: string;

  @IsInt()
  @Min(-1)
  @Max(1)
  @ApiProperty({
    type: Number,
    minimum: -1,
    maximum: 1,
    example: basketApiInformation.updatedProductQuantity,
  })
  quantity: number;
}
