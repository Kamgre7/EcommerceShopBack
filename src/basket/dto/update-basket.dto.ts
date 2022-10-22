import { IsInt, IsUUID, Max, Min } from 'class-validator';

export class UpdateBasketDto {
  @IsUUID(4)
  basketId: string;

  @IsInt()
  @Min(-1)
  @Max(1)
  quantity: number;
}
