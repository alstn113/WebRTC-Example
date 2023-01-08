import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import useGetMe from '~/hooks/queries/user/useGetMe';
import useConnectedUsersStore from '~/libs/stores/useConnectedUsersStore';
import useMyMediaStreamStore from '~/libs/stores/useMyMediaStreamStore';
import usePeerConnectionStore from '~/libs/stores/usePeerConnectionStore';
import { User } from '~/libs/types';
import VideoScreen from './VideoScreen';

interface Props {
  roomId: string;
}
const VideoContents = ({ roomId }: Props) => {
  const { myMediaStream, setMyMediaStream } = useMyMediaStreamStore();
  const { userStreams, connectedUsers } = useConnectedUsersStore();
  const { peerConnections } = usePeerConnectionStore();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());

  const findUserStream = (sid: string): MediaStream | null => {
    const user = connectedUsers.find((user) => user.sid === sid);
    if (!user) return null;
    return userStreams[user.sid];
  };

  useEffect(() => {
    const setMediaTracks = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      setMyMediaStream(stream);
    };

    setMediaTracks();
  }, []);

  return (
    <VideoContainer>
      <FlexColumn>
        <FlexRow>
          <VideoScreen connectedUser={{ uid: user?.user.id }} stream={myMediaStream} />
          {connectedUsers[0] ? (
            <VideoScreen
              connectedUser={connectedUsers[0]}
              stream={findUserStream(connectedUsers[0].sid)}
            />
          ) : (
            <BlackScreen />
          )}
        </FlexRow>
        <Test>Connected Users: {JSON.stringify(connectedUsers)}</Test>
        <Test>User Streams: {JSON.stringify(userStreams)}</Test>
        <Test>peerConnections: {JSON.stringify(peerConnections)}</Test>
        <FlexRow>
          {connectedUsers[1] ? (
            <VideoScreen
              connectedUser={connectedUsers[1]}
              stream={findUserStream(connectedUsers[1].sid)}
            />
          ) : (
            <BlackScreen />
          )}
          {connectedUsers[2] ? (
            <VideoScreen
              connectedUser={connectedUsers[2]}
              stream={findUserStream(connectedUsers[2].sid)}
            />
          ) : (
            <BlackScreen />
          )}
        </FlexRow>
      </FlexColumn>
    </VideoContainer>
  );
};

export default VideoContents;

const Test = styled.div`
  font-size: 0.8rem;
`;
const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlackScreen = styled.div`
  width: 300px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
