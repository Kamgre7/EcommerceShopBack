import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import {
  AddToBasketResponse,
  BasketFilterResponse,
  RemoveProductFromBasket,
} from '../types';

@Controller('/basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('/')
  addToBasket(
    @Body() createBasketDto: CreateBasketDto,
  ): Promise<AddToBasketResponse> {
    return this.basketService.addToBasket(createBasketDto);
  }

  @Get(/*'/:id'*/)
  showBasket(/*@Param('id') id: string*/): Promise<BasketFilterResponse[]> {
    return this.basketService.showBasket(/*id*/);
  }

  @Get('/total-price' /*/total-price/:id*/)
  getTotalPrice(/*@Param('id') id: string*/): Promise<number> {
    return this.basketService.getTotalPrice(/*id*/);
  }

  @Delete('/all/:id')
  clearBasket(@Param('id') id: string) {
    return this.basketService.clearBasket(id);
  }

  @Delete('/:id')
  removeItem(@Param('id') id: string): Promise<RemoveProductFromBasket> {
    return this.basketService.removeItem(id);
  }
}
