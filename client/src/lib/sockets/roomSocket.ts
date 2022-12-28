import { io, Socket } from 'socket.io-client';
import { EVENT } from '~/constants';
import { PROPERTIES } from '~/constants/properties';

class RoomSocket {
  socket: Socket | null;
  constructor() {
    this.socket = null;
  }

  generateRoomSocket() {
    this.socket = io(`${PROPERTIES.BASE_URL}/socket/rooms`, {
      transports: ['websocket', 'polling'], // use WebSocket first, if available
    });
  }

  initRoomSocket() {
    if (roomSocket.socket === null) {
      roomSocket.generateRoomSocket();
    }
    roomSocket.socket?.connect();
  }

  leaveRoom(roomId: string) {
    this.socket?.emit(EVENT.LEAVE_ROOM, { roomId });
    this.socket?.off(EVENT.JOIN_ROOM);
    this.socket?.off(EVENT.LEAVE_ROOM);
    this.socket?.off(EVENT.RECEIVE_MESSAGE);
    this.socket?.off(EVENT.SEND_MESSAGE);
    this.socket?.disconnect();
  }
}

const roomSocket = new RoomSocket();

export default roomSocket;
