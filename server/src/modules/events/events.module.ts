import { Module } from '@nestjs/common';
import { RoomsGateway } from './rooms.gateway';

@Module({
  imports: [],
  providers: [RoomsGateway],
})
export class EventsModule {}
