import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserFilterResponseProp } from './dto/create-user.dto';
import {
  CreateUserAddressDto,
  CreateUserAddressResponseProp,
} from './dto/create-user-address.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../decorators/roles.decorator';
import {
  CreateUserAddressResponse,
  EditUserInfoResponse,
  LoginResponse,
  RecoverUserPwdResponse,
  RegisterUserResponse,
  UserActivationInterface,
  UserAddressInterface,
  UserDeleteAccount,
  UserEditPwdInterface,
  UserInfoResponse,
  UserRole,
} from '../types';
import { RolesGuard } from '../guards/roles.guard';
import {
  EditUserPwdDto,
  EditUserPwdResponseProp,
} from './dto/edit-user-pwd.dto';
import { UserAddressEntity } from './entities/user-address.entity';
import {
  EditUserInfoDto,
  EditUserInfoResponseProp,
} from './dto/edit-user-info.dto';
import {
  RecoverUserPwdDto,
  RecoverUserPwdResponseProp,
} from './dto/recover-user-pwd.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    description: 'User id and mail as response',
    type: UserFilterResponseProp,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Try again',
  })
  @ApiBody({
    type: CreateUserDto,
    required: true,
  })
  @Post('/register')
  createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegisterUserResponse> {
    return this.userService.createUser(createUserDto);
  }

  @ApiCookieAuth('jwt')
  @ApiCreatedResponse({
    description: 'Is success: true/false',
    type: CreateUserAddressResponseProp,
  })
  @ApiUnauthorizedResponse({ description: 'You must be logged in' })
  @ApiBody({
    type: CreateUserAddressDto,
    required: true,
  })
  @Post('/address/')
  @UseGuards(AuthGuard('jwt'))
  createUserAddress(
    @Body() createUserAddressDto: CreateUserAddressDto,
    @UserObj() user: UserEntity,
  ): Promise<CreateUserAddressResponse> {
    return this.userService.createAdditionalUserAddress(
      createUserAddressDto,
      user,
    );
  }

  @ApiCookieAuth('jwt')
  @ApiCreatedResponse({
    description: 'Is success user information changed',
    type: EditUserInfoResponseProp,
  })
  @ApiUnauthorizedResponse({ description: 'You must be logged in' })
  @ApiBody({
    type: EditUserInfoDto,
    required: true,
  })
  @Patch('/edit')
  @UseGuards(AuthGuard('jwt'))
  editUserInfo(
    @UserObj() user: UserEntity,
    @Body() editUserInfoDto: EditUserInfoDto,
  ): Promise<EditUserInfoResponse> {
    return this.userService.editUserInfo(editUserInfoDto, user);
  }

  @ApiCookieAuth('jwt')
  @ApiCreatedResponse({
    description: 'Is success user password changed',
    type: EditUserPwdResponseProp,
  })
  @ApiUnauthorizedResponse({ description: 'You must be logged in' })
  @ApiBody({
    type: EditUserPwdDto,
    required: true,
  })
  @Patch('/edit/password')
  @UseGuards(AuthGuard('jwt'))
  editUserPassword(
    @UserObj() user: UserEntity,
    @Body() editUserPwdDto: EditUserPwdDto,
  ): Promise<UserEditPwdInterface> {
    return this.userService.editUserPassword(editUserPwdDto, user);
  }

  @ApiCreatedResponse({
    description: 'Is success user password changed',
    type: RecoverUserPwdResponseProp,
  })
  @ApiBadRequestResponse({
    description: 'Cannot recover password. Try again',
  })
  @ApiBody({
    type: RecoverUserPwdDto,
    required: true,
  })
  @Put('/recover-password')
  recoverUserPassword(
    @Body() recoverUserPwdDto: RecoverUserPwdDto,
  ): Promise<RecoverUserPwdResponse> {
    return this.userService.recoverUserPassword(recoverUserPwdDto);
  }

  @ApiOkResponse({
    description: 'Return true if activation confirmed',
  })
  @ApiBadRequestResponse({
    description: 'Cannot activate user account. Try again',
  })
  @ApiParam({
    name: 'token',
    type: String,
    example: '1rmnq348phrq',
    description: 'Unique user activation token',
    required: true,
  })
  @Get('/activate/:token')
  activateUserAccount(
    @Param('token') token: string,
  ): Promise<UserActivationInterface> {
    return this.userService.activateUserAccount(token);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: 'Return array of all users',
    isArray: true,
    type: '',
  })
  @ApiForbiddenResponse()
  @Get('/')
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAllUsers(): Promise<UserInfoResponse[]> {
    return this.userService.findAllUsers();
  }

  @Get('/check')
  @UseGuards(AuthGuard('jwt'))
  checkIfUserLogged(
    @UserObj() user: UserEntity,
  ): Promise<LoginResponse | null> {
    return this.userService.checkIfUserLogged(user);
  }

  @Get('/address/')
  @UseGuards(AuthGuard('jwt'))
  findUserAddress(
    @UserObj() user: UserEntity,
  ): Promise<UserAddressInterface[]> {
    return this.userService.findUserAddress(user);
  }

  @Get('/address/:addressId')
  @UseGuards(AuthGuard('jwt'))
  findOneUserAddress(
    @Param('addressId') addressId: string,
    @UserObj() user: UserEntity,
  ): Promise<UserAddressEntity | null> {
    return this.userService.findOneUserAddress(addressId, user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  findOneUser(
    @Param('id') userId: string,
    @UserObj() user: UserEntity,
  ): Promise<UserInfoResponse> {
    return this.userService.findOneUser(user, userId);
  }

  @Delete('/:userId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  removeUser(
    @Param('userId') userId: string,
    @UserObj() user: UserEntity,
  ): Promise<UserDeleteAccount> {
    return this.userService.removeUser(userId, user);
  }
}
