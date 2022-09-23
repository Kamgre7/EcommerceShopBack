import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import {
  AddToBasketResponse,
  BasketFilterResponse,
  //  BasketTotalPriceResponse,
  RemoveProductFromBasket,
} from '../types';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('/basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  addToBasket(
    @Body() createBasketDto: CreateBasketDto,
    @UserObj() user: UserEntity,
  ): Promise<AddToBasketResponse> {
    return this.basketService.addToBasket(createBasketDto, user);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  showBasket(@UserObj() user: UserEntity): Promise<BasketFilterResponse[]> {
    return this.basketService.showBasket(user);
  }

  /*  @Get('/total-price')
  @UseGuards(AuthGuard('jwt'))
  getTotalPrice(
    @UserObj() user: UserEntity,
  ): Promise<BasketTotalPriceResponse> {
    return this.basketService.getTotalPrice(user);
  }*/

  @Delete('/all')
  @UseGuards(AuthGuard('jwt'))
  clearBasket(@UserObj() user: UserEntity): Promise<RemoveProductFromBasket> {
    return this.basketService.clearBasket(user);
  }

  @Delete('/:basketId')
  @UseGuards(AuthGuard('jwt'))
  removeItem(
    @Param('basketId') basketId: string,
    @UserObj() user: UserEntity,
  ): Promise<RemoveProductFromBasket> {
    return this.basketService.removeItem(basketId, user);
  }
}
