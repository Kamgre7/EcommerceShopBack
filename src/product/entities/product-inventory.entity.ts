import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductInventoryInterface } from '../../types';
import { ProductEntity } from './product.entity';

@Entity()
export class ProductInventoryEntity
  extends BaseEntity
  implements ProductInventoryInterface
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  quantity: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @OneToOne((type) => ProductEntity)
  product: ProductEntity;
}
