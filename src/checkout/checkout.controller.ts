import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserEntity } from '../user/entities/user.entity';
import {
  CheckoutOrderHistoryResponse,
  CheckoutPlaceOrderResponse,
  CheckoutTotalPriceResponse,
} from '../types';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('/order')
  @UseGuards(AuthGuard('jwt'))
  placeOrder(
    @Body() createCheckoutDto: CreateCheckoutDto,
    @UserObj() user: UserEntity,
  ): Promise<CheckoutPlaceOrderResponse> {
    return this.checkoutService.placeOrder(createCheckoutDto, user);
  }

  @Get('/order/history')
  @UseGuards(AuthGuard('jwt'))
  orderHistory(
    @UserObj() user: UserEntity,
  ): Promise<CheckoutOrderHistoryResponse[]> {
    return this.checkoutService.orderHistory(user);
  }

  @Get('/order/history/:orderId')
  @UseGuards(AuthGuard('jwt'))
  singleOrderInfo(
    @Param('orderId') orderId: string,
    @UserObj() user: UserEntity,
  ): Promise<CheckoutOrderHistoryResponse> {
    return this.checkoutService.singleOrderInfo(orderId, user);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  basketCheckout(
    @UserObj() user: UserEntity,
  ): Promise<CheckoutTotalPriceResponse> {
    return this.checkoutService.basketCheckout(user);
  }
}
