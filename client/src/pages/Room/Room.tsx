import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AsyncBoundary from '~/components/AsyncBoundary';
import { Button } from '~/components/common';
import ErrorFallback from '~/components/ErrorFallback';
import { EVENT } from '~/constants';
import { MESSAGE } from '~/constants/messages';
import useGetRoom from '~/hooks/queries/room/useGetRoom';
import userGetMe from '~/hooks/queries/user/useGetMe';
import roomSocket from '~/lib/sockets/roomSocket';
import { User } from '~/lib/types';
import RoomContent from './RoomContent';

const Room = () => {
  const { roomId } = useParams() as { roomId: string };
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(userGetMe.getKey());

  useEffect(() => {
    roomSocket.createRoomSocket();
    roomSocket.socket?.on('connect', () => {
      console.log('connected');
    });
    roomSocket.socket?.on('disconnect', () => {
      console.log('disconnected');
    });
    // 방에 입장
    roomSocket.socket?.emit(EVENT.JOIN_ROOM, { roomId });
    roomSocket.socket?.on(EVENT.RECEIVE_MESSAGE, (data) => {
      console.log(data);
    });
    return () => {
      roomSocket.socket?.emit(EVENT.LEAVE_ROOM, { roomId });
      roomSocket.socket?.disconnect();
      roomSocket.deleteRoomSocket();
    };
  }, []);

  const handleSendMessage = () => {
    roomSocket.socket?.emit(EVENT.SEND_MESSAGE, {
      message: `Hello I'm ${user?.user?.email}`,
      roomId,
    });
  };
  return (
    <AsyncBoundary
      rejectedFallback={
        <ErrorFallback
          message={MESSAGE.ERROR.LOAD_DATA}
          queryKey={useGetRoom.getKey(roomId)}
        />
      }
    >
      <div>{user?.user.email}</div>
      <br />
      <Button shadow color="warning" onClick={handleSendMessage}>
        메시지 보내기
      </Button>
      <br />
      <RoomContent roomId={roomId} />
    </AsyncBoundary>
  );
};

export default Room;
