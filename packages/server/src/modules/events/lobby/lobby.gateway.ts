import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket', 'polling'],
  namespace: 'socket/lobby',
})
export class LobbyGateway {
  // constructor() {}
}
