import { useRef, useEffect } from 'react';
import * as S from './VideoScreen.styles';

const VideoScreen = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: 'user' },
      });
      if (videoRef && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const makeConnection = () => {
    return;
  };

  useEffect(() => {
    getMedia();
    makeConnection();
    return;
  }, []);

  return (
    <S.VideoContainer>
      <S.Video autoPlay playsInline ref={videoRef}>
        VideoScreen
      </S.Video>
    </S.VideoContainer>
  );
};

export default VideoScreen;
