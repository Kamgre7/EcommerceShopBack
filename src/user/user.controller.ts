import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserAddressResponse, UserInfoResponse, UserRole } from '../types';
import { RolesGuard } from '../guards/roles.guard';

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
  ): Promise<any> {
    return this.userService.removeUser(userId, user);
  }
}
