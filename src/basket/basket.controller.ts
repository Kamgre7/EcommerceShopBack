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

@Controller('/basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('/')
  addToBasket(@Body() createBasketDto: CreateBasketDto) {
    return this.basketService.addToBasket(createBasketDto);
  }

  @Get('/:id')
  showBasket(@Param('id') id: string) {
    return this.basketService.showBasket(id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(+id, updateBasketDto);
  }*/

  @Delete('/all/:id')
  clearBasket(@Param('id') id: string) {
    return this.basketService.clearBasket(id);
  }

  @Delete('/:id')
  removeItem(@Param('id') id: string) {
    return this.basketService.removeItem(id);
  }
}
