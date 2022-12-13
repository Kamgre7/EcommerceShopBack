import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MulterDiskUploadedFiles } from '../../types';

export class StorageObjectDto extends CreateCategoryDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  photo: MulterDiskUploadedFiles;
}
