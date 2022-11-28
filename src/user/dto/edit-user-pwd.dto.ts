import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userApiInformation } from '../../utils/api-messages';

export class EditUserPwdDto {
  @IsString()
  @MinLength(6)
  @ApiProperty({
    type: String,
    example: userApiInformation.password,
    minLength: 6,
  })
  currentPassword: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    type: String,
    example: userApiInformation.newPwd,
    minLength: 6,
  })
  newPassword: string;
}
