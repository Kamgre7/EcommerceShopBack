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
import { userApiInformation, userApiMessage } from '../../utils/api-messages';

@Entity()
export class UserEntity extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: userApiInformation.userId,
  })
  id: string;

  @Column({
    length: 25,
  })
  @ApiProperty({
    type: String,
    example: userApiInformation.firstName,
  })
  firstName: string;

  @Column({
    length: 25,
  })
  @ApiProperty({
    type: String,
    example: userApiInformation.lastName,
  })
  lastName: string;

  @Column({
    length: 255,
    unique: true,
  })
  @ApiProperty({
    type: String,
    example: userApiInformation.email,
  })
  email: string;

  @Column({
    length: 255,
  })
  @ApiProperty({
    type: String,
    description: userApiMessage.uniqueHashedPwd,
    example: userApiInformation.hashedPwd,
  })
  pwdHash: string;

  @Column({
    length: 255,
  })
  @ApiProperty({
    type: String,
    description: userApiMessage.uniquePwdSalt,
  })
  pwdSalt: string;

  @Column({
    default: null,
    nullable: true,
  })
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: userApiInformation.currentTokenId,
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
    description: userApiMessage.uniqueUserToken,
  })
  activationToken: string;

  @CreateDateColumn()
  @ApiProperty({
    description: userApiMessage.createdDate,
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: userApiMessage.updatedDate,
  })
  modifiedAt: Date;

  @OneToMany(() => UserAddressEntity, (entity) => entity.user)
  address: UserAddressEntity[];

  @OneToMany(() => BasketEntity, (entity) => entity.user)
  userBasket: BasketEntity[];

  @OneToMany(() => OrderEntity, (entity) => entity.user)
  order: OrderEntity[];
}
