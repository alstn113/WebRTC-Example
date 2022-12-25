import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AsyncBoundary from '~/components/AsyncBoundary';
import { Button } from '~/components/common';
import ErrorFallback from '~/components/ErrorFallback';
import { MESSAGE } from '~/constants/messages';
import useGetRoomList from '~/hooks/queries/room/useGetRoomList';
import userGetMe from '~/hooks/queries/user/useGetMe';
import useOpenLoginDialog from '~/hooks/useOpenLoginDialog';
import roomSocket from '~/lib/sockets/roomSocket';
import RoomListContent from './RoomListContent';

const Home = () => {
  const navigate = useNavigate();
  const handleGithubLogin = () => {
    navigate('/loading');
    window.location.href = 'http://localhost:8080/auth/github';
  };
  useEffect(() => {
    roomSocket.createRoomSocket();
    roomSocket.socket?.on('connect', () => {
      console.log('connected');
    });
    roomSocket.socket?.on('disconnect', () => {
      console.log('disconnected');
    });
    roomSocket.socket?.emit('join', 1);
    roomSocket.socket?.on('join', (data) => {
      console.log(data);
    });
  }, []);

  const openLoginDialog = useOpenLoginDialog();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(userGetMe.getKey());

  return (
    <div>
      <Button onClick={openLoginDialog}>Login</Button>
      Home <button onClick={handleGithubLogin}>sdf</button>
      <div>{JSON.stringify(user)}</div>
      <AsyncBoundary
        rejectedFallback={
          <ErrorFallback
            message={MESSAGE.ERROR.LOAD_DATA}
            queryKey={useGetRoomList.getKey()}
          />
        }
      >
        <RoomListContent />
      </AsyncBoundary>
    </div>
  );
};

export default Home;
