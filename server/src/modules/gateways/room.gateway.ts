import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/room/',
})
export class RoomGateway {}
