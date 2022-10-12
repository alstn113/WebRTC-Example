import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { NextPage } from 'next';
import { PROPERTIES } from '~/constants/properties';

let socket: Socket;

const Index: NextPage = () => {
  socket = io(PROPERTIES.SOCKET_URL);
  useEffect(() => {
    socket.emit('ClientToServer', { data: 'Hello Server' });
    socket.on('ServerToClient', (message) => {
      console.log(message);
    });
  }, []);

  return <div>Index</div>;
};

export default Index;
