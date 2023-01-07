import { io, Socket } from 'socket.io-client';
import { EVENT } from '~/constants';
import { PROPERTIES } from '~/constants/properties';

class LobbySocket {
  socket: Socket | null;
  constructor() {
    this.socket = null;
  }

  private generateLobbySocket() {
    this.socket = io(`${PROPERTIES.LOBBY_SOCKET_URI}`, {
      transports: ['websocket', 'polling'], // use WebSocket first, if available
    });
  }

  initLobbySocket() {
    if (lobbySocket.socket === null) {
      lobbySocket.generateLobbySocket();
    }
    lobbySocket.socket?.connect();
  }

  receiveMessage(callback: any) {
    lobbySocket.socket?.on(EVENT.CHAT_MESSAGE, (data) => {
      callback(data);
    });
  }

  sendMessage(message: string) {
    lobbySocket.socket?.emit(EVENT.CHAT_MESSAGE, {
      message,
    });
  }

  leaveLobby() {
    this.socket?.emit(EVENT.LEAVE_LOBBY);
    this.socket?.off(EVENT.JOIN_LOBBY);
    this.socket?.off(EVENT.LEAVE_LOBBY);
    this.socket?.off(EVENT.CHAT_MESSAGE);
    this.socket?.disconnect();
  }
}

const lobbySocket = new LobbySocket();

export default lobbySocket;
