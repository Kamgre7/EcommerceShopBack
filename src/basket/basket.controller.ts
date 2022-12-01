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
  basketApiInformation,
  basketApiMessage,
  userApiMessage,
} from 'src/utils/api-messages';
import {
  AddToBasketResponseProp,
  BasketFilterResponseProp,
  BasketUpdateResponseProp,
  RemoveProductFromBasketProp,
} from './props/basket.props';

@ApiTags('Basket')
@Controller('/basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @ApiCookieAuth('jwt')
  @ApiCreatedResponse({
    type: AddToBasketResponseProp,
    description: basketApiMessage.addToBasket,
  })
  @ApiBody({
    type: CreateBasketDto,
    required: true,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  addToBasket(
    @Body() createBasketDto: CreateBasketDto,
    @UserObj() user: UserEntity,
  ): Promise<AddToBasketResponse> {
    return this.basketService.addToBasket(createBasketDto, user);
  }

  @ApiCookieAuth('jwt')
  @ApiCreatedResponse({
    type: BasketUpdateResponseProp,
    description: basketApiMessage.changeItemQuantity,
  })
  @ApiBody({
    type: UpdateBasketDto,
    required: true,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @Patch('/')
  @UseGuards(AuthGuard('jwt'))
  changeItemQuantity(
    @Body() updateBasketDto: UpdateBasketDto,
    @UserObj() user: UserEntity,
  ): Promise<BasketUpdateResponse> {
    return this.basketService.changeItemQuantity(updateBasketDto, user);
  }

  @ApiOkResponse({
    description: 'Return array of user basket',
    type: BasketFilterResponseProp,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  showBasket(@UserObj() user: UserEntity): Promise<BasketFilterResponse[]> {
    return this.basketService.showBasket(user);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: basketApiMessage.clearBasket,
    type: RemoveProductFromBasketProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @Delete('/all')
  @UseGuards(AuthGuard('jwt'))
  clearBasket(@UserObj() user: UserEntity): Promise<RemoveProductFromBasket> {
    return this.basketService.clearBasket(user);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: basketApiMessage.deleteBasket,
    type: RemoveProductFromBasketProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiParam({
    name: 'basketId',
    type: String,
    description: basketApiMessage.uniqueBasketId,
    required: true,
    format: 'uuid',
    example: basketApiInformation.basketId,
  })
  @Delete('/:basketId')
  @UseGuards(AuthGuard('jwt'))
  removeItem(
    @Param('basketId') basketId: string,
    @UserObj() user: UserEntity,
  ): Promise<RemoveProductFromBasket> {
    return this.basketService.removeItem(basketId, user);
  }
}
