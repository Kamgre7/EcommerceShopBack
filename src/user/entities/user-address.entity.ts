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
import { userApiInformation } from '../../utils/api-messages';

@Entity()
export class UserAddressEntity
  extends BaseEntity
  implements UserAddressInterface
{
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: userApiInformation.addressId,
  })
  id: string;

  @Column({
    length: 255,
  })
  @ApiProperty({
    type: String,
    example: userApiInformation.address,
  })
  address: string;

  @Column({
    length: 255,
  })
  @ApiProperty({
    type: String,
    example: userApiInformation.city,
  })
  city: string;

  @Column({
    length: 10,
  })
  @ApiProperty({
    type: String,
    example: userApiInformation.postalCode,
  })
  postalCode: string;

  @Column({
    length: 60,
  })
  @ApiProperty({
    type: String,
    example: userApiInformation.country,
  })
  country: string;

  @Column({
    type: 'int',
  })
  @ApiProperty({
    type: Number,
    example: userApiInformation.mobilePhone,
  })
  mobilePhone: number;

  @ManyToOne(() => UserEntity, (entity) => entity.address)
  user: UserEntity;

  @OneToMany(() => OrderEntity, (entity) => entity.address)
  orderAddress: OrderEntity;
}
