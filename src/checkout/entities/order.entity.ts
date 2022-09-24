import { CheckoutInterface } from '../../types';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { UserAddressEntity } from '../../user/entities/user-address.entity';

@Entity()
export class OrderEntity extends BaseEntity implements CheckoutInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'float',
    precision: 8,
    scale: 2,
  })
  total: number;

  @Column('simple-array')
  items: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (entity) => entity.order)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserAddressEntity, (entity) => entity.orderAddress)
  @JoinColumn()
  address: UserAddressEntity;
}
