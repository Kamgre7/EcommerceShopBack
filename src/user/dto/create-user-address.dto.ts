import { IsInt, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAddressDto {
  @IsString()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: 'Street 11b',
    minLength: 3,
    maxLength: 255,
  })
  address: string;

  @IsString()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: 'Warsaw',
    minLength: 3,
    maxLength: 255,
  })
  city: string;

  @IsString()
  @Length(3, 10)
  @ApiProperty({
    type: String,
    example: '44321',
    minLength: 3,
    maxLength: 10,
  })
  postalCode: string;

  @IsString()
  @Length(3, 60)
  @ApiProperty({
    type: String,
    example: 'Poland',
    minLength: 3,
    maxLength: 60,
  })
  country: string;

  @IsInt()
  @ApiProperty({
    type: Number,
    example: 123456789,
  })
  mobilePhone: number;
}
