import { io, Socket } from 'socket.io-client';
import { PROPERTIES } from '~/constants/properties';

let socket: Socket;

export const initSocketConnection = () => {
  if (socket) return;
  socket = io(PROPERTIES.SOCKET_URL, { transports: ['websocket'] });
};

export const messageOn = (callback: Function) => {
  socket.on('ServerToClient', (data) => callback(data));
};

export const messageEmit = (message: string) => {
  socket.emit('ClientToServer', message);
};
