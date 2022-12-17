import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '~/common/decorators/get-current-user.decorator';
import { JwtGuard } from '../auth/guards';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';

@Controller('/rooms')
@ApiTags('/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  async createRoom(@Body() dto: CreateRoomDto, @GetCurrentUser() user) {
    return await this.roomsService.createRoom(dto, user);
  }

  @Get()
  async getAllRooms() {
    return await this.roomsService.findAllRooms();
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  async getRoomById(@Param('id', ParseIntPipe) id: string) {
    return await this.roomsService.findRoomById(id);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async deleteRoomById(@Param('id', ParseIntPipe) id: string, @GetCurrentUser() user) {
    return await this.roomsService.deleteRoomById(id, user);
  }
}
