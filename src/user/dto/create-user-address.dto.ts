import { IsInt, IsString, Length } from 'class-validator';

export class CreateUserAddressDto {
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
