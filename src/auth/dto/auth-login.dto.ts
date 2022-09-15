import { IsEmail, IsString, Length } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 25)
  password: string;
}
