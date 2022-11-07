import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';

@Controller('/rooms')
@ApiTags('/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}
}
