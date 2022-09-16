import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import {
  AddToBasketResponse,
  BasketFilterResponse,
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

  @Get(/*'/:id'*/)
  @UseGuards(AuthGuard('jwt'))
  showBasket(/*@Param('id') id: string*/): Promise<BasketFilterResponse[]> {
    return this.basketService.showBasket(/*id*/);
  }

  @Get('/total-price' /*/total-price/:id*/)
  @UseGuards(AuthGuard('jwt'))
  getTotalPrice(/*@Param('id') id: string*/): Promise<number> {
    return this.basketService.getTotalPrice(/*id*/);
  }

  @Delete('/all/:id')
  @UseGuards(AuthGuard('jwt'))
  clearBasket(@Param('id') id: string) {
    return this.basketService.clearBasket(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  removeItem(@Param('id') id: string): Promise<RemoveProductFromBasket> {
    return this.basketService.removeItem(id);
  }
}
