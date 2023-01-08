import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AsyncBoundary from '~/components/AsyncBoundary';
import { Button } from '~/components/common';
import ErrorFallback from '~/components/ErrorFallback';
import MediaStreamSetting from '~/components/Room/MediaStreamSetting';
import { MESSAGE } from '~/constants/messages';
import useGetRoom from '~/hooks/queries/room/useGetRoom';
import useGetMe from '~/hooks/queries/user/useGetMe';
import roomSocket from '~/libs/sockets/roomSocket';
import { User } from '~/libs/types';
import Chat from './Chat';
import RoomContent from './RoomContent';
import VideoContents from './VideoContents';

const Room = () => {
  const { roomId } = useParams() as { roomId: string };
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());

  useEffect(() => {
    roomSocket.initRoomSocket();
    roomSocket.joinRoom(roomId);
    return () => {
      roomSocket.leaveRoom(roomId);
    };
  }, [roomId]);

  return (
    <AsyncBoundary
      rejectedFallback={
        <ErrorFallback message={MESSAGE.ERROR.LOAD_DATA} queryKey={useGetRoom.getKey(roomId)} />
      }
    >
      <Container>
        <RoomContent roomId={roomId} />
        <Button color="secondary">{user?.user?.email}</Button>
        <ContentsWrapper>
          <VideoContents roomId={roomId} />
          {/* <Chat roomId={roomId} /> */}
        </ContentsWrapper>
        <MediaStreamSetting />
      </Container>
    </AsyncBoundary>
  );
};

export default Room;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
