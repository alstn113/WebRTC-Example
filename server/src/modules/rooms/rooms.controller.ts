import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('/rooms')
@Controller('/rooms')
export class RoomsController {
  @Get('/')
  async getRooms() {
    return 'rooms';
  }

  @Get('/:id')
  async getRoom() {
    return 'room';
  }
}
