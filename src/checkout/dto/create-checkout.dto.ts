import { IsCreditCard, IsString, IsUUID } from 'class-validator';

export class CreateCheckoutDto {
  @IsUUID(4)
  userAddressId: string;

  @IsCreditCard()
  creditCard: string;

  @IsString()
  expDate: string;

  @IsString()
  creditCardCvc: string;
}
