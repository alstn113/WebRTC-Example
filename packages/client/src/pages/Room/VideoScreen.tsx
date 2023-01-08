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

  return <Container autoPlay playsInline ref={videoRef} />;
};

const Container = styled.video`
  width: 300px;
  height: 300px;
  background-color: #000;
`;

export default VideoScreen;
