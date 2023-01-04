import { io, Socket } from 'socket.io-client';
import { EVENT } from '~/constants';
import { PROPERTIES } from '~/constants/properties';

class RoomSocket {
  socket: Socket | null;
  constructor() {
    this.socket = null;
  }

  private generateRoomSocket() {
    this.socket = io(`${PROPERTIES.BASE_URL}/socket/rooms`, {
      transports: ['websocket', 'polling'], // use WebSocket first, if available
    });
  }

  initRoomSocket(roomId: string) {
    if (roomSocket.socket === null) {
      roomSocket.generateRoomSocket();
    }
    roomSocket.socket?.connect();

    // --- 여기는 확인용으로 임시로 넣어둠 ---
    // roomSocket.socket?.on('connect', () => {
    //   console.log('connected');
    // });
    // roomSocket.socket?.on('disconnect', () => {
    //   console.log('disconnected');
    // });
    // roomSocket.socket?.emit(EVENT.JOIN_ROOM, { roomId });
    roomSocket.socket?.on(EVENT.RECEIVE_MESSAGE, (data) => {
      console.log(data);
    });
    // --------------------------------
  }

  sendMessage(roomId: string, message: string) {
    roomSocket.socket?.emit(EVENT.SEND_MESSAGE, {
      roomId,
      message,
    });
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
