import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(1500)
  description: string;
}
