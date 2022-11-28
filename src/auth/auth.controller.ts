import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import {
  AuthLoginDto,
  LogoutSuccessfulResponseProp,
} from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { LoginResponse, LogoutResponse } from '../types';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginSuccessfulResponseProp } from '../user/dto/user-props.dto';
import { userApiMessage } from 'src/utils/api-messages';

@ApiTags('Login')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: userApiMessage.loginUser,
    type: LoginSuccessfulResponseProp,
  })
  @ApiBadRequestResponse({
    description: userApiMessage.loginUserBadReq,
  })
  @ApiBody({
    required: true,
    type: AuthLoginDto,
  })
  @Post('/login')
  userLogin(
    @Body() authLoginDto: AuthLoginDto,
    @Res() res: Response,
  ): Promise<Response<LoginResponse>> {
    return this.authService.login(authLoginDto, res);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: userApiMessage.logoutUser,
    type: LogoutSuccessfulResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  userLogout(
    @UserObj() user: UserEntity,
    @Res() res: Response,
  ): Promise<Response<LogoutResponse>> {
    return this.authService.logout(user, res);
  }
}
