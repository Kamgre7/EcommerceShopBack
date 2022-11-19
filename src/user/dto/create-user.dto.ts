import { IsEmail, IsInt, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserFilterResponse } from '../../types';

export class CreateUserDto {
  @IsString()
  @Length(3, 25)
  @ApiProperty({
    type: String,
    example: 'John',
    minLength: 3,
    maxLength: 25,
  })
  firstName: string;

  @IsString()
  @Length(3, 25)
  @ApiProperty({
    type: String,
    example: 'Example',
    minLength: 3,
    maxLength: 25,
  })
  lastName: string;

  @IsEmail()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: 'example@mail.com',
    minLength: 3,
    maxLength: 255,
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    type: String,
    example: 'userPwd123',
    minLength: 6,
  })
  password: string;

  @IsString()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: 'Street 1a',
    minLength: 3,
    maxLength: 255,
  })
  address: string;

  @IsString()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: 'London ',
    minLength: 3,
    maxLength: 255,
  })
  city: string;

  @IsString()
  @Length(3, 10)
  @ApiProperty({
    type: String,
    example: '11123',
    minLength: 3,
    maxLength: 10,
  })
  postalCode: string;

  @IsString()
  @Length(3, 60)
  @ApiProperty({
    type: String,
    example: 'England',
    minLength: 3,
    maxLength: 60,
  })
  country: string;

  @IsInt()
  @ApiProperty({
    type: Number,
    example: '123456789',
  })
  mobilePhone: number;
}

export class UserFilterResponseProp implements UserFilterResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}
