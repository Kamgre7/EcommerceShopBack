import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EditUserInfoResponse, UserFilterResponse } from '../../types';

export class EditUserInfoDto {
  @IsString()
  @Length(3, 25)
  @ApiProperty({
    type: String,
    example: 'Hary',
    minLength: 3,
    maxLength: 25,
  })
  firstName: string;

  @IsString()
  @Length(3, 25)
  @ApiProperty({
    type: String,
    example: 'Name',
    minLength: 3,
    maxLength: 25,
  })
  lastName: string;

  @IsEmail()
  @Length(3, 255)
  @ApiProperty({
    type: String,
    example: 'newMail@example.com',
    minLength: 3,
    maxLength: 255,
  })
  email: string;
}

export class EditUserInfoResponseProp implements EditUserInfoResponse {
  @ApiProperty()
  isSuccess: true;

  @ApiProperty()
  message: string;
}
