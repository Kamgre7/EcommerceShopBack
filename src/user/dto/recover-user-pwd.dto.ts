import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { userApiInformation } from '../../utils/api-messages';

export class RecoverUserPwdDto {
  @IsEmail()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: userApiInformation.email,
    minLength: 3,
    maxLength: 255,
  })
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiPropertyOptional({
    oneOf: [{ type: 'string' }, { type: 'undefined' }],
    example: userApiInformation.password,
    minLength: 6,
  })
  pwd: string | undefined;
}
