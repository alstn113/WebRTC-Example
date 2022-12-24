import { io, Socket } from 'socket.io-client';
import { PROPERTIES } from '~/constants/properties';

class RoomSocket {
  socket: Socket | null;
  constructor() {
    this.socket = null;
  }

  createRoomSocket() {
    const access_token = localStorage.getItem('access_token');
    if (this.socket && !access_token) return;

    this.socket = io(`${PROPERTIES.BASE_URL}/socket/chats`, {
      /** @description https://socket.io/docs/v3/client-initialization/#transports */
      transports: ['websocket', 'polling'], // use WebSocket first, if available
      query: {
        token: localStorage.getItem('access_token'),
      },
    });
  }

  deleteRoomSocket() {
    this.socket = null;
  }
}

const roomSocket = new RoomSocket();

export default roomSocket;
