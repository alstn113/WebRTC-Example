import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import usePeerConnection from '~/hooks/usePeerConnection';
import useConnectedUsersStore from '~/libs/stores/useConnectedUsersStore';
import useMyMediaStreamStore from '~/libs/stores/useMyMediaStreamStore';

interface Props {
  roomId: string;
}
const VideoContents = ({ roomId }: Props) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const { myMediaStream } = useMyMediaStreamStore();
  const { userStreams, connectedUsers } = useConnectedUsersStore();

  useEffect(() => {
    const setVideoTracks = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (localVideoRef.current) {
        // remove howling sound
        localVideoRef.current.volume = 0;
        localVideoRef.current.srcObject = stream;
      }
    };
    if (!myMediaStream) {
      setVideoTracks();
    }
    if (remoteVideoRef.current && connectedUsers.length > 0) {
      remoteVideoRef.current.srcObject = userStreams[connectedUsers[0].sid];
    }
  }, [connectedUsers, userStreams, myMediaStream]);

  usePeerConnection();

  return (
    <VideoContainer>
      <FlexColumn>
        <FlexRow>
          <VideoScreen autoPlay ref={localVideoRef} />
          <VideoScreen autoPlay ref={remoteVideoRef} />
        </FlexRow>
        <FlexRow>
          <VideoScreen autoPlay ref={localVideoRef} />
          <VideoScreen autoPlay ref={remoteVideoRef} />
        </FlexRow>
      </FlexColumn>
    </VideoContainer>
  );
};

export default VideoContents;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const VideoScreen = styled.video`
  width: 300px;
  height: 300px;
  background-color: #000;
`;
