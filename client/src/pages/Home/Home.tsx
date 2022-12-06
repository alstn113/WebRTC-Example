import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { PROPERTIES } from '~/constants/properties';

const socket = io(PROPERTIES.BASE_URL);

const Home = () => {
  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:8080/auth/github';
  };

  return (
    <div>
      Home <button onClick={handleGithubLogin}>sdf</button>
    </div>
  );
};

export default Home;
