import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto';
import { GetCurrentUser, Public } from '~/common/decorators';
import { User } from '@prisma/client';

@ApiTags('users')
@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get('/me')
  async getCurrentUser(@GetCurrentUser() user: User) {
    return this.usersService.getCurrentUser(user);
  }
}
