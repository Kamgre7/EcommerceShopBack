import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from '../../product/entities/product.entity';
import { BasketInterface } from '../../types';

@Entity()
export class BasketEntity extends BaseEntity implements BasketInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  quantity: number;

  @ManyToOne((type) => ProductEntity, (entity) => entity.itemsInBasket)
  @JoinColumn()
  product: ProductEntity;
}
