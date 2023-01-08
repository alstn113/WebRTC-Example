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
import usePeerConnection from '~/hooks/usePeerConnection';
import useMyMediaStreamStore from '~/libs/stores/useMyMediaStreamStore';
import useConnectedUsersStore from '~/libs/stores/useConnectedUsersStore';
import { EVENT } from '~/constants';

const Room = () => {
  const { roomId } = useParams() as { roomId: string };
  const { myMediaStream, setMyMediaStream } = useMyMediaStreamStore();
  const { deleteConnectedUser, findUserByUid, addConnectedUser } = useConnectedUsersStore();

  const stopMediaStream = () => {
    if (!myMediaStream) return;
    myMediaStream.getTracks().forEach((track) => track.stop());
    setMyMediaStream(null);
  };

  useEffect(() => {
    roomSocket.initRoomSocket(roomId);
    roomSocket.socket?.on(
      EVENT.EXISTING_ROOM_USERS,
      ({
        users,
        current,
      }: {
        users: { sid: string; uid: string }[];
        current: { sid: string; uid: string };
      }) => {
        users.forEach((user) => {
          const isAlreadyInRoom = findUserByUid(user.uid);
          if (isAlreadyInRoom) return;
          addConnectedUser({
            sid: user.sid,
            uid: user.uid,
          });
        });
      },
    );
    //TODO: left user socket 만들고 connectedUsersStore deleteUser 해줘야함

    return () => {
      roomSocket.leaveRoom(roomId);
      stopMediaStream();
    };
  }, [roomId]);

  usePeerConnection();

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
