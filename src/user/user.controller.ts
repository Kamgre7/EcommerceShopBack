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
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'User id and mail as response',
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Try again',
  })
  createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegisterUserResponse> {
    return this.userService.createUser(createUserDto);
  }

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

  @Patch('/edit')
  @UseGuards(AuthGuard('jwt'))
  editUserInfo(
    @UserObj() user: UserEntity,
    @Body() editUserInfoDto: EditUserInfoDto,
  ): Promise<EditUserInfoResponse> {
    return this.userService.editUserInfo(editUserInfoDto, user);
  }

  @Patch('/edit/password')
  @UseGuards(AuthGuard('jwt'))
  editUserPassword(
    @UserObj() user: UserEntity,
    @Body() editUserPwdDto: EditUserPwdDto,
  ): Promise<UserEditPwdInterface> {
    return this.userService.editUserPassword(editUserPwdDto, user);
  }

  @Put('/recover-password')
  recoverUserPassword(
    @Body() recoverUserPwdDto: RecoverUserPwdDto,
  ): Promise<RecoverUserPwdResponse> {
    return this.userService.recoverUserPassword(recoverUserPwdDto);
  }

  @Get('/activate/:token')
  activateUserAccount(
    @Param('token') token: string,
  ): Promise<UserActivationInterface> {
    return this.userService.activateUserAccount(token);
  }

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
  removeUser(
    @Param('userId') userId: string,
    @UserObj() user: UserEntity,
  ): Promise<UserDeleteAccount> {
    return this.userService.removeUser(userId, user);
  }
}
