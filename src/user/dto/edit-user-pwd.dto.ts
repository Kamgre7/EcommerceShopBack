import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditUserPwdDto {
  @IsString()
  @MinLength(6)
  @ApiProperty({
    type: String,
    example: 'currentPwd',
    minLength: 6,
  })
  currentPassword: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    type: String,
    example: 'newPwd',
    minLength: 6,
  })
  newPassword: string;
}
