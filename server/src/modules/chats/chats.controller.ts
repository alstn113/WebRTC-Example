import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ChatsService } from './chats.service';

@Controller('/chats')
@ApiTags('/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
}
