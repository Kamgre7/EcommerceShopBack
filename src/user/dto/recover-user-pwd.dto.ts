import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class RecoverUserPwdDto {
  @IsEmail()
  @Length(3, 255)
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  pwd: string | undefined;
}
