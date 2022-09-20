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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../decorators/roles.decorator';
import {
  UserActivationInterface,
  UserAddressResponse,
  UserDeleteAccount,
  UserEditPwdInterface,
  UserInfoResponse,
  UserRole,
} from '../types';
import { RolesGuard } from '../guards/roles.guard';
import { EditUserPwdDto } from './dto/edit-user-pwd.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/address/')
  @UseGuards(AuthGuard('jwt'))
  createUserAddress(
    @Body() createUserAddressDto: CreateUserAddressDto,
    @UserObj() user: UserEntity,
  ) {
    return this.userService.createAdditionalUserAddress(
      createUserAddressDto,
      user,
    );
  }

  @Patch('/edit/password')
  @UseGuards(AuthGuard('jwt'))
  editUserPassword(
    @UserObj() user: UserEntity,
    @Body() editUserPwdDto: EditUserPwdDto,
  ): Promise<UserEditPwdInterface> {
    return this.userService.editUserPassword(editUserPwdDto, user);
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

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  findOneUser(
    @Param('id') userId: string,
    @UserObj() user: UserEntity,
  ): Promise<UserInfoResponse> {
    return this.userService.findOneUser(user, userId);
  }

  @Get('/address/')
  @UseGuards(AuthGuard('jwt'))
  findUserAddress(@UserObj() user: UserEntity): Promise<UserAddressResponse[]> {
    return this.userService.findUserAddress(user);
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
