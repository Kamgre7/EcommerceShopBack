import { IsEmail, IsString, Length } from 'class-validator';

export class EditUserInfoDto {
  @IsString()
  @Length(3, 25)
  firstName: string;

  @IsString()
  @Length(3, 25)
  lastName: string;

  @IsEmail()
  @Length(3, 255)
  email: string;
}
