import { IsInt, IsUUID } from 'class-validator';

export class CreateBasketDto {
  @IsUUID(4)
  productId: string;

  @IsInt()
  quantity: number;
}
