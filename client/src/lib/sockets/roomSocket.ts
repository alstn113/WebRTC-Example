import { io, Socket } from 'socket.io-client';
import { PROPERTIES } from '~/constants/properties';

class RoomSocket {
  socket: Socket | null;
  constructor() {
    this.socket = null;
  }

  createRoomSocket() {
    if (this.socket) return;

    this.socket = io(`${PROPERTIES.BASE_URL}/socket/rooms`, {
      transports: ['websocket', 'polling'], // use WebSocket first, if available
    });
  }

  deleteRoomSocket() {
    this.socket = null;
  }
}

const roomSocket = new RoomSocket();

export default roomSocket;
