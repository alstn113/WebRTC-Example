import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

const VideoContents = () => {
  const localViedoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const setVideoTracks = async () => {
    return;
  };

  const createOffer = async () => {
    return;
  };

  const createAnswer = async () => {
    return;
  };

  useEffect(() => {
    return;
  }, []);

  return (
    <VideoContainer>
      <VideoScreen autoPlay ref={localViedoRef} />
      <VideoScreen autoPlay ref={remoteVideoRef} />
    </VideoContainer>
  );
};

export default VideoContents;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const VideoScreen = styled.video`
  width: 360px;
  height: 360px;
  margin: 2rem;
  background-color: #000;
`;
