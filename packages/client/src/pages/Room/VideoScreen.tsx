import { useRef } from '@storybook/addons';
import * as S from './VideoScreen.styles';

const VideoScreen = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return <S.Video ref={videoRef}>VideoScreen</S.Video>;
};

export default VideoScreen;
