import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get(':user_id')
  @ResponseMessage('User by user_id')
  async findUserById(@Param('user_id') user_id: string) {
    return await this.usersService.findUserById(user_id);
  }

  @Delete()
  @ResponseMessage('Delete user')
  async deleteUser(@User() user: IUser) {
    return await this.usersService.deleteUser(user);
  }

  @Patch()
  @ResponseMessage('Update User')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return await this.usersService.updateUser(updateUserDto, user);
  }
}
