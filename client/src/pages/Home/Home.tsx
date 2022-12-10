import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { PROPERTIES } from '~/constants/properties';

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

  return (
    <div>
      Home <button onClick={handleGithubLogin}>sdf</button>
    </div>
  );
};

export default Home;
