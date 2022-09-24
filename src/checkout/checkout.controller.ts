import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/order')
  @UseGuards(AuthGuard('jwt'))
  placeOrder(
    @Body() createCheckoutDto: CreateCheckoutDto,
    @UserObj() user: UserEntity,
  ) {
    return this.checkoutService.placeOrder(createCheckoutDto, user);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  basketCheckout(@UserObj() user: UserEntity) {
    return this.checkoutService.basketCheckout(user);
  }
}
