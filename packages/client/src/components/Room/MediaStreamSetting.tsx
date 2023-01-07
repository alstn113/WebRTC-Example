import styled from '@emotion/styled';
import useMediaStreamStore from '~/libs/stores/useMyMediaStreamStore';
import { Button } from '../common';

const MediaStreamSetting = () => {
  const { isMicOn, isVideoOn, setIsMicOn, setIsVideoOn, mediaStream } = useMediaStreamStore();
  const handleMicToggle = () => {
    mediaStream?.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    setIsMicOn(!isMicOn);
  };
  const handleVideoToggle = () => {
    mediaStream?.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    setIsVideoOn(!isVideoOn);
  };
  return (
    <SettingWrapper>
      <Button shadow color="primary" onClick={handleMicToggle}>
        MIC: {isMicOn ? 'ON' : 'OFF'}
      </Button>
      <Button shadow color="primary" onClick={handleVideoToggle}>
        VIDEO: {isVideoOn ? 'ON' : 'OFF'}
      </Button>
    </SettingWrapper>
  );
};

const SettingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default MediaStreamSetting;
