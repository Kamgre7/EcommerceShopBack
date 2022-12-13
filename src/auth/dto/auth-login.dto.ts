import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userApiInformation } from 'src/utils/api-messages';
import { LogoutSuccessfulResponse } from '../../types';

export class AuthLoginDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    example: userApiInformation.email,
  })
  email: string;

  @IsString()
  @Length(6, 25)
  @ApiProperty({
    type: String,
    example: userApiInformation.password,
  })
  password: string;
}

export class LogoutSuccessfulResponseProp implements LogoutSuccessfulResponse {
  @ApiProperty()
  isSuccess: true;
}
