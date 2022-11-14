import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RecoverUserPwdDto {
  @IsEmail()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: 'user@mail.com',
    minLength: 3,
    maxLength: 255,
  })
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiPropertyOptional({
    oneOf: [{ type: 'string' }, { type: 'undefined' }],
    example: 'userPwd',
    minLength: 6,
  })
  pwd: string | undefined;
}
