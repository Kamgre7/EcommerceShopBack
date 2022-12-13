import { IsCreditCard, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { userApiInformation } from 'src/utils/api-messages';

export class CreateCheckoutDto {
  @IsUUID(4)
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: userApiInformation.addressId,
  })
  userAddressId: string;

  @IsCreditCard()
  @ApiProperty({
    type: String,
    example: userApiInformation.creditCard,
  })
  creditCard: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: userApiInformation.expDateCreditCart,
  })
  expDate: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: userApiInformation.cvcCreditCard,
  })
  creditCardCvc: string;
}
