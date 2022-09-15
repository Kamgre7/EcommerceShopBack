import { IsEmail, IsInt, IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 25)
  firstName: string;

  @IsString()
  @Length(3, 25)
  lastName: string;

  @IsEmail()
  @Length(3, 255)
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @Length(3, 255)
  address: string;

  @IsString()
  @Length(3, 255)
  city: string;

  @IsString()
  @Length(3, 10)
  postalCode: string;

  @IsString()
  @Length(3, 60)
  country: string;

  @IsInt()
  mobilePhone: number;
}
