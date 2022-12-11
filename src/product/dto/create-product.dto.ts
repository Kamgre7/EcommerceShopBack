import {
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  categoryApiInformation,
  productApiInformation,
} from 'src/utils/api-messages';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty({
    type: String,
    example: productApiInformation.name,
    minLength: 3,
    maxLength: 25,
  })
  name: string;

  @IsNumber()
  @Min(0.1)
  @Max(999999)
  @ApiProperty({
    type: Number,
    example: productApiInformation.price,
  })
  price: number;

  @IsInt()
  @Min(1)
  @Max(5000)
  @ApiProperty({
    type: Number,
    example: productApiInformation.quantity,
  })
  quantity: number;

  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty({
    type: String,
    example: productApiInformation.sku,
  })
  sku: string;

  @IsUUID(4)
  @ApiProperty({
    type: String,
    example: categoryApiInformation.categoryId,
  })
  categoryId: string;

  @IsString()
  @MinLength(3)
  @MaxLength(1500)
  @ApiProperty({
    type: String,
    example: productApiInformation.description,
    minLength: 3,
    maxLength: 1500,
  })
  description: string;
}
