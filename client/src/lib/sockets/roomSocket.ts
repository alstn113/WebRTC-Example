import { io, Socket } from 'socket.io-client';
import { PROPERTIES } from '~/constants/properties';

class RoomSocket {
  socket: Socket | null;
  constructor() {
    this.socket = null;
  }

  createRoomSocket() {
    this.socket = io(`${PROPERTIES.BASE_URL}/rooms`, {
      /** @description https://socket.io/docs/v3/client-initialization/#transports */
      transports: ['websocket', 'polling'], // use WebSocket first, if available
    });
  }

  deleteRoomSocket() {
    this.socket = null;
  }
}

const roomSocket = new RoomSocket();

export default roomSocket;
