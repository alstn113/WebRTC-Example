import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AsyncBoundary from '~/components/AsyncBoundary';
import { Button } from '~/components/common';
import ErrorFallback from '~/components/ErrorFallback';
import { MESSAGE } from '~/constants/messages';
import useGetRoomList from '~/hooks/queries/room/useGetRoomList';
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
  }, []);

  const openLoginDialog = useOpenLoginDialog();

  return (
    <div>
      <Button onClick={openLoginDialog}>Login</Button>
      Home <button onClick={handleGithubLogin}>sdf</button>
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
