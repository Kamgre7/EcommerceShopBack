import { IsInt, IsUUID, Max, Min } from 'class-validator';

export class CreateBasketDto {
  @IsUUID(4)
  productId: string;

  @IsInt()
  @Min(1)
  @Max(5000)
  quantity: number;
}
