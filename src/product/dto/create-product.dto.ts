import {
  IsInt,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0.1)
  price: number;

  @IsInt()
  @Min(1)
  @Max(5000)
  quantity: number;

  @IsString()
  sku: string;

  @IsString()
  category: string;

  @IsString()
  @MinLength(3)
  @MaxLength(1500)
  description: string;
}
