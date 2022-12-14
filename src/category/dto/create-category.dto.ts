import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { categoryApiInformation } from '../../utils/api-messages';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @ApiProperty({
    type: String,
    example: categoryApiInformation.name,
  })
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(1500)
  @ApiProperty({
    type: String,
    example: categoryApiInformation.description,
  })
  description: string;
}
