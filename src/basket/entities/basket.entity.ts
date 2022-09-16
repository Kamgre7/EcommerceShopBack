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
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class BasketEntity extends BaseEntity implements BasketInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  quantity: number;

  @ManyToOne(() => ProductEntity, (entity) => entity.itemsInBasket)
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.userBasket)
  @JoinColumn()
  user: UserEntity;
}
