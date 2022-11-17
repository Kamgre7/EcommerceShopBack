import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'email@example.com',
  })
  email: string;

  @IsString()
  @Length(6, 25)
  @ApiProperty({
    type: String,
    example: 'pwdExample123',
  })
  password: string;
}
