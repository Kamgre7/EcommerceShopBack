import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategoryInterface } from '../../types';
import { ProductEntity } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { categoryApiInformation } from 'src/utils/api-messages';

@Entity()
export class ProductCategoryEntity
  extends BaseEntity
  implements ProductCategoryInterface
{
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: categoryApiInformation.categoryId,
  })
  id: string;

  @Column({
    length: 25,
    unique: true,
  })
  @ApiProperty({
    type: String,
    example: categoryApiInformation.name,
  })
  name: string;

  @Column({
    length: 1500,
    default: '',
  })
  @ApiProperty({
    type: String,
    example: categoryApiInformation.description,
  })
  description: string;

  @Column({
    default: null,
    nullable: true,
  })
  @ApiProperty({
    type: String,
    example: categoryApiInformation.photoFileName,
  })
  photoFileName: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    type: String,
    example: categoryApiInformation.dateNow,
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    type: String,
    example: categoryApiInformation.dateNow,
  })
  modifiedAt: Date;

  @OneToMany((type) => ProductEntity, (entity) => entity.category)
  productList: ProductEntity[];
}
