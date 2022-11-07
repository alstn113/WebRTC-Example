import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('/users')
@ApiTags('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
