import { Module } from '@nestjs/common';
import { RoomGateway } from './room.gateway';

@Module({
  imports: [],
  providers: [RoomGateway],
})
export class GatewaysModule {}
