import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import {
  AddToBasketResponse,
  BasketFilterResponse,
  BasketUpdateResponse,
  RemoveProductFromBasket,
} from '../types';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { UpdateBasketDto } from './dto/update-basket.dto';

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

  @Patch('/')
  @UseGuards(AuthGuard('jwt'))
  changeItemQuantity(
    @Body() updateBasketDto: UpdateBasketDto,
    @UserObj() user: UserEntity,
  ): Promise<BasketUpdateResponse> {
    return this.basketService.changeItemQuantity(updateBasketDto, user);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  showBasket(@UserObj() user: UserEntity): Promise<BasketFilterResponse[]> {
    return this.basketService.showBasket(user);
  }

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
