import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInterface, UserRole } from '../../types';
import { UserAddressEntity } from './user-address.entity';
import { BasketEntity } from '../../basket/entities/basket.entity';
import { OrderEntity } from '../../checkout/entities/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'a05e7037-ebb8-418d-9653-797af68d5d01',
  })
  id: string;

  @Column({
    length: 25,
  })
  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstName: string;

  @Column({
    length: 25,
  })
  @ApiProperty({
    type: String,
    example: 'Example',
  })
  lastName: string;

  @Column({
    length: 255,
    unique: true,
  })
  @ApiProperty({
    type: String,
    example: 'example@mail.com',
  })
  email: string;

  @Column({
    length: 255,
  })
  @ApiProperty({
    type: String,
    description: 'Hashed user password',
  })
  pwdHash: string;

  @Column({
    length: 255,
  })
  @ApiProperty({
    type: String,
    description: 'User random salt',
  })
  pwdSalt: string;

  @Column({
    default: null,
    nullable: true,
  })
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: 'a05e7037-ebb8-418d-9653-797af68d5d01',
    default: null,
  })
  currentTokenId: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    default: false,
  })
  @ApiProperty({
    type: Boolean,
    default: false,
  })
  active: boolean;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'User activation token',
  })
  activationToken: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'When user was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'When user was updated' })
  modifiedAt: Date;

  @OneToMany(() => UserAddressEntity, (entity) => entity.user)
  address: UserAddressEntity[];

  @OneToMany(() => BasketEntity, (entity) => entity.user)
  userBasket: BasketEntity[];

  @OneToMany(() => OrderEntity, (entity) => entity.user)
  order: OrderEntity[];
}
