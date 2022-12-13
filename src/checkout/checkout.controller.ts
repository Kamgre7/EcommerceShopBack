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
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  checkoutApiInformation,
  checkoutApiMessage,
  userApiMessage,
} from '../utils/api-messages';
import {
  CheckoutOrderHistoryResponseProp,
  CheckoutPlaceOrderResponseProp,
  CheckoutTotalPriceResponseProp,
} from './props/checkout.props';

@ApiTags('Checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @ApiCookieAuth('jwt')
  @ApiCreatedResponse({
    description: checkoutApiMessage.placeOrder,
    type: CheckoutPlaceOrderResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiBody({
    type: CreateCheckoutDto,
    required: true,
  })
  @Post('/order')
  @UseGuards(AuthGuard('jwt'))
  placeOrder(
    @Body() createCheckoutDto: CreateCheckoutDto,
    @UserObj() user: UserEntity,
  ): Promise<CheckoutPlaceOrderResponse> {
    return this.checkoutService.placeOrder(createCheckoutDto, user);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: checkoutApiMessage.findUserOrderHistory,
    isArray: true,
    type: CheckoutOrderHistoryResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @Get('/order/history')
  @UseGuards(AuthGuard('jwt'))
  orderHistory(
    @UserObj() user: UserEntity,
  ): Promise<CheckoutOrderHistoryResponse[]> {
    return this.checkoutService.orderHistory(user);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: checkoutApiMessage.findUserSingleOrder,
    type: CheckoutOrderHistoryResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiParam({
    name: 'orderId',
    type: String,
    example: checkoutApiInformation.orderId,
    description: checkoutApiMessage.uniqueOrderId,
    required: true,
  })
  @Get('/order/history/:orderId')
  @UseGuards(AuthGuard('jwt'))
  singleOrderInfo(
    @Param('orderId') orderId: string,
    @UserObj() user: UserEntity,
  ): Promise<CheckoutOrderHistoryResponse> {
    return this.checkoutService.singleOrderInfo(orderId, user);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: checkoutApiMessage.totalPriceInfo,
    type: CheckoutTotalPriceResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  basketCheckout(
    @UserObj() user: UserEntity,
  ): Promise<CheckoutTotalPriceResponse> {
    return this.checkoutService.basketCheckout(user);
  }
}
