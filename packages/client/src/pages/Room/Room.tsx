import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AsyncBoundary from '~/components/AsyncBoundary';
import { Button } from '~/components/common';
import ErrorFallback from '~/components/ErrorFallback';
import { MESSAGE } from '~/constants/messages';
import useGetRoom from '~/hooks/queries/room/useGetRoom';
import useGetMe from '~/hooks/queries/user/useGetMe';
import roomSocket from '~/lib/sockets/roomSocket';
import { User } from '~/lib/types';
import RoomContent from './RoomContent';
import VideoScreen from './VideoScreen';

const Room = () => {
  const { roomId } = useParams() as { roomId: string };
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());

  useEffect(() => {
    roomSocket.initRoomSocket(roomId);

    return () => {
      roomSocket.leaveRoom(roomId);
    };
  }, [roomId]);

  const handleSendMessage = () => {
    roomSocket.sendMessage(roomId, 'Hello');
  };

  return (
    <AsyncBoundary
      rejectedFallback={
        <ErrorFallback message={MESSAGE.ERROR.LOAD_DATA} queryKey={useGetRoom.getKey(roomId)} />
      }
    >
      <div>{user?.user?.email}</div>
      <br />
      <VideoScreen />
      <Button shadow color="warning" onClick={handleSendMessage}>
        메시지 보내기
      </Button>
      <br />
      <RoomContent roomId={roomId} />
    </AsyncBoundary>
  );
};

export default Room;
