import { IsEmail, IsInt, IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userApiInformation } from '../../utils/api-messages';

export class CreateUserDto {
  @IsString()
  @Length(3, 25)
  @ApiProperty({
    type: String,
    example: userApiInformation.firstName,
    minLength: 3,
    maxLength: 25,
  })
  firstName: string;

  @IsString()
  @Length(3, 25)
  @ApiProperty({
    type: String,
    example: userApiInformation.lastName,
    minLength: 3,
    maxLength: 25,
  })
  lastName: string;

  @IsEmail()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: userApiInformation.email,
    minLength: 3,
    maxLength: 255,
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    type: String,
    example: userApiInformation.password,
    minLength: 6,
  })
  password: string;

  @IsString()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: userApiInformation.address,
    minLength: 3,
    maxLength: 255,
  })
  address: string;

  @IsString()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: userApiInformation.city,
    minLength: 3,
    maxLength: 255,
  })
  city: string;

  @IsString()
  @Length(3, 10)
  @ApiProperty({
    type: String,
    example: userApiInformation.postalCode,
    minLength: 3,
    maxLength: 10,
  })
  postalCode: string;

  @IsString()
  @Length(3, 60)
  @ApiProperty({
    type: String,
    example: userApiInformation.country,
    minLength: 3,
    maxLength: 60,
  })
  country: string;

  @IsInt()
  @ApiProperty({
    type: Number,
    example: userApiInformation.mobilePhone,
  })
  mobilePhone: number;
}
