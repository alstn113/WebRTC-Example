import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatsService } from './chats.service';

@Controller('/rooms')
@ApiTags('/rooms')
export class RoomsController {
  constructor(private readonly chatsService: ChatsService) {}
}
