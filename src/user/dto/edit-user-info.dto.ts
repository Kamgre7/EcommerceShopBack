import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userApiInformation } from '../../utils/api-messages';

export class EditUserInfoDto {
  @IsString()
  @Length(3, 25)
  @ApiProperty({
    type: String,
    example: userApiInformation.firstName,
    minLength: 3,
    maxLength: 25,
  })
  firstName: string;

  @IsString()
  @Length(3, 25)
  @ApiProperty({
    type: String,
    example: userApiInformation.lastName,
    minLength: 3,
    maxLength: 25,
  })
  lastName: string;

  @IsEmail()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: userApiInformation.email,
    minLength: 3,
    maxLength: 255,
  })
  email: string;
}
