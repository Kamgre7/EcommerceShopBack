import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInterface, UserRole } from '../../types';
import { UserAddressEntity } from './user-address.entity';
import { BasketEntity } from '../../basket/entities/basket.entity';

@Entity()
export class UserEntity extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 25,
  })
  firstName: string;

  @Column({
    length: 25,
  })
  lastName: string;

  @Column({
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    length: 255,
  })
  pwdHash: string;

  @Column({
    length: 255,
  })
  pwdSalt: string;

  @Column({
    default: null,
    nullable: true,
  })
  currentTokenId: string;

  @Column({
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @OneToMany(() => UserAddressEntity, (entity) => entity.user)
  address: UserAddressEntity[];

  @OneToMany(() => BasketEntity, (entity) => entity.user)
  userBasket: BasketEntity[];
}
