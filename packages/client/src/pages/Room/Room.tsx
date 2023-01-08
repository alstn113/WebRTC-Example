import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AsyncBoundary from '~/components/AsyncBoundary';
import ErrorFallback from '~/components/ErrorFallback';
import MediaStreamSetting from '~/pages/Room/MediaStreamSetting';
import { MESSAGE } from '~/constants/messages';
import useGetRoom from '~/hooks/queries/room/useGetRoom';
import roomSocket from '~/libs/sockets/roomSocket';
import RoomContent from './RoomContent';
import VideoContents from './VideoContents';

const Room = () => {
  const { roomId } = useParams() as { roomId: string };

  useEffect(() => {
    roomSocket.initRoomSocket(roomId);
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
        <ContentsWrapper>
          <VideoContents roomId={roomId} />
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
