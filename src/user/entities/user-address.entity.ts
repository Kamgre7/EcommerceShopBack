import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAddressInterface } from '../../types';
import { UserEntity } from './user.entity';

@Entity()
export class UserAddressEntity
  extends BaseEntity
  implements UserAddressInterface
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  address: string;

  @Column({
    length: 255,
  })
  city: string;

  @Column({
    length: 10,
  })
  postalCode: string;

  @Column({
    length: 60,
  })
  country: string;

  @Column({
    type: 'tinyint',
  })
  mobilePhone: number;

  @ManyToOne(() => UserEntity, (entity) => entity.address)
  user: UserEntity;
}