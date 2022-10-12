import { io } from 'socket.io-client';
import { PROPERTIES } from '~/constants/properties';

const socket = io(PROPERTIES.BASE_URL);

export const messageOn = (callback: Function) => {
  socket.on('ServerToClient', (data) => callback(data));
};

export const messageEmit = (message: string) => {
  socket.emit('ClientToServer', message);
};

export default socket;
