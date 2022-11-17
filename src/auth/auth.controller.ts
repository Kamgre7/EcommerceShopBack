import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { LoginResponse, LogoutResponse } from '../types';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiCreatedResponse({
    description: 'User information object as response',
    //type:
  })
  @ApiBadRequestResponse({
    description: 'User cannot logged in. Try again',
  })
  userLogin(
    @Body() authLoginDto: AuthLoginDto,
    @Res() res: Response,
  ): Promise<Response<LoginResponse>> {
    return this.authService.login(authLoginDto, res);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  userLogout(
    @UserObj() user: UserEntity,
    @Res() res: Response,
  ): Promise<Response<LogoutResponse>> {
    return this.authService.logout(user, res);
  }
}
