import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

interface Props {
  connectedUser: {
    uid: string | undefined;
    sid?: string;
  };
  stream: MediaStream | null;
}

const VideoScreen = ({ connectedUser, stream }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <VideoScreenWrapper>
      <Container autoPlay playsInline ref={videoRef} />
      <UserInfo>{connectedUser.uid}</UserInfo>
    </VideoScreenWrapper>
  );
};

const Container = styled.video`
  width: 300px;
  height: 250px;
  background-color: #000;
`;

const VideoScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UserInfo = styled.div`
  font-size: 1rem;
  background-color: #000;
  color: #fff;
  width: 100%;
  text-align: center;
`;

export default VideoScreen;
