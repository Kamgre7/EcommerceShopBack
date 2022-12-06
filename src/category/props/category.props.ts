import { ApiProperty } from '@nestjs/swagger';
import { categoryApiInformation } from '../../utils/api-messages';

export class CategoryFilterResponseProp {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: categoryApiInformation.categoryId,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: categoryApiInformation.name,
  })
  name: string;

  @ApiProperty({
    type: String,
    example: categoryApiInformation.description,
  })
  description: string;
}
