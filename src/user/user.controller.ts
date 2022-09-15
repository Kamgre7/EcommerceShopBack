import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserAddressDto } from './dto/create-user-address.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/address/:userId')
  createUserAddress(
    @Body() createUserAddressDto: CreateUserAddressDto,
    @Param('userId') userId: string,
  ) {
    return this.userService.createAdditionalUserAddress(
      createUserAddressDto,
      userId,
    );
  }

  @Get('/address/:userId')
  findUserAddress(@Param('userId') userId: string) {
    return this.userService.findUserAddress(userId);
  }
  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }*/
}
