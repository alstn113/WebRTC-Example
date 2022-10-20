import { useEffect } from 'react';
import { Manager } from 'socket.io-client';
import { NextPage } from 'next';
import { PROPERTIES } from '~/constants/properties';

const manager = new Manager(PROPERTIES.SOCKET_CHAT_URL);
const chats = manager.socket('/chats');

const Index: NextPage = () => {
  useEffect(() => {
    chats.emit('ClientToServer', { data: 'Hello Server' });
    chats.on('ServerToClient', (message) => {
      console.log(message);
    });
  }, []);

  return <div>Index</div>;
};

export default Index;
