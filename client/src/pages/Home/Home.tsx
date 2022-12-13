import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Button } from '~/components/common';
import { PROPERTIES } from '~/constants/properties';
import useOpenLoginDialog from '~/hooks/useOpenLoginDialog';

const socket = io(PROPERTIES.BASE_URL);

const Home = () => {
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:8080/auth/github';
  };
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }, []);

  const openLoginDialog = useOpenLoginDialog();

  return (
    <div>
      <Button onClick={openLoginDialog}>Login</Button>
      Home <button onClick={handleGithubLogin}>sdf</button>
    </div>
  );
};

export default Home;
