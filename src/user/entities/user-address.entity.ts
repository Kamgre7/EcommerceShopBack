import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAddressInterface } from '../../types';
import { UserEntity } from './user.entity';
import { OrderEntity } from '../../checkout/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserAddressEntity
  extends BaseEntity
  implements UserAddressInterface
{
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({
    length: 255,
  })
  @ApiProperty()
  address: string;

  @Column({
    length: 255,
  })
  @ApiProperty()
  city: string;

  @Column({
    length: 10,
  })
  @ApiProperty()
  postalCode: string;

  @Column({
    length: 60,
  })
  @ApiProperty()
  country: string;

  @Column({
    type: 'int',
  })
  @ApiProperty()
  mobilePhone: number;

  @ManyToOne(() => UserEntity, (entity) => entity.address)
  user: UserEntity;

  @OneToMany(() => OrderEntity, (entity) => entity.address)
  orderAddress: OrderEntity;
}
