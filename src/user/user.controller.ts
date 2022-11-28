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
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
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
import { EditUserPwdDto } from './dto/edit-user-pwd.dto';
import { UserAddressEntity } from './entities/user-address.entity';
import { EditUserInfoDto } from './dto/edit-user-info.dto';
import { RecoverUserPwdDto } from './dto/recover-user-pwd.dto';
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
import {
  CreateUserAddressResponseProp,
  EditUserInfoResponseProp,
  EditUserPwdResponseProp,
  LoginSuccessfulResponseProp,
  RecoverUserPwdResponseProp,
  UserActivationProp,
  UserAddressProp,
  UserDeleteAccountProp,
  UserFilterResponseProp,
  UserInfoResponseProp,
} from './dto/user-props.dto';
import { userApiInformation, userApiMessage } from '../utils/api-messages';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({
    description: userApiMessage.createUser,
    type: UserFilterResponseProp,
  })
  @ApiBadRequestResponse({
    description: userApiMessage.createUserBadReq,
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
    description: userApiMessage.createUserAddress,
    type: CreateUserAddressResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
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
    description: userApiMessage.editUserInfo,
    type: EditUserInfoResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
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
    description: userApiMessage.editUserPwd,
    type: EditUserPwdResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
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
    description: userApiMessage.recoverUserPwd,
    type: RecoverUserPwdResponseProp,
  })
  @ApiBadRequestResponse({
    description: userApiMessage.recoverUserPwdBadReq,
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
    description: userApiMessage.activateUserAccount,
    type: UserActivationProp,
  })
  @ApiBadRequestResponse({
    description: userApiMessage.activateUserAccountBadReq,
  })
  @ApiParam({
    name: 'token',
    type: String,
    example: userApiInformation.activationToken,
    description: userApiMessage.uniqueUserToken,
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
    description: userApiMessage.findAllUsers,
    isArray: true,
    type: UserInfoResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiForbiddenResponse({
    description: userApiMessage.forbiddenUser,
  })
  @Get('/')
  @Roles([UserRole.ADMIN])
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAllUsers(): Promise<UserInfoResponse[]> {
    return this.userService.findAllUsers();
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: userApiMessage.checkIfUserLogged,
    type: LoginSuccessfulResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @Get('/check')
  @UseGuards(AuthGuard('jwt'))
  checkIfUserLogged(
    @UserObj() user: UserEntity,
  ): Promise<LoginResponse | null> {
    return this.userService.checkIfUserLogged(user);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: userApiMessage.findUserAddress,
    isArray: true,
    type: UserAddressProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @Get('/address/')
  @UseGuards(AuthGuard('jwt'))
  findUserAddress(
    @UserObj() user: UserEntity,
  ): Promise<UserAddressInterface[]> {
    return this.userService.findUserAddress(user);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: userApiMessage.findOneUserAddress,
    type: UserAddressEntity,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiParam({
    name: 'addressId',
    type: String,
    description: userApiMessage.uniqueUserAddressId,
    required: true,
    format: 'uuid',
    example: userApiInformation.addressId,
  })
  @Get('/address/:addressId')
  @UseGuards(AuthGuard('jwt'))
  findOneUserAddress(
    @Param('addressId') addressId: string,
    @UserObj() user: UserEntity,
  ): Promise<UserAddressEntity | null> {
    return this.userService.findOneUserAddress(addressId, user);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: userApiMessage.findOneUser,
    type: UserInfoResponseProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: userApiMessage.uniqueUserId,
    required: true,
    format: 'uuid',
    example: userApiInformation.userId,
  })
  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  findOneUser(
    @Param('id') userId: string,
    @UserObj() user: UserEntity,
  ): Promise<UserInfoResponse> {
    return this.userService.findOneUser(user, userId);
  }

  @ApiCookieAuth('jwt')
  @ApiOkResponse({
    description: userApiMessage.removeUser,
    type: UserDeleteAccountProp,
  })
  @ApiUnauthorizedResponse({
    description: userApiMessage.unauthorizedUser,
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: userApiMessage.uniqueUserId,
    required: true,
    format: 'uuid',
    example: userApiInformation.userId,
  })
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
