import styled from '@emotion/styled';
import useMyMediaStreamStore from '~/libs/stores/useMyMediaStreamStore';
import { Button } from '../../components/common';

const MediaStreamSetting = () => {
  const { isMyMicOn, isMyVideoOn, setIsMyMicOn, setIsMyVideoOn, myMediaStream } =
    useMyMediaStreamStore();
  const handleMicToggle = () => {
    myMediaStream?.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    setIsMyMicOn(!isMyMicOn);
  };
  const handleVideoToggle = () => {
    myMediaStream?.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    setIsMyVideoOn(!isMyVideoOn);
  };
  return (
    <SettingWrapper>
      <Button shadow size="sm" color={isMyMicOn ? 'primary' : 'error'} onClick={handleMicToggle}>
        MIC: {isMyMicOn ? 'ON' : 'OFF'}
      </Button>
      <Button
        shadow
        size="sm"
        color={isMyVideoOn ? 'primary' : 'error'}
        onClick={handleVideoToggle}
      >
        VIDEO: {isMyVideoOn ? 'ON' : 'OFF'}
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
