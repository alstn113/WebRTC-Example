import produce from 'immer';
import create from 'zustand';

type States = {
  mediaStream: MediaStream | null;
  isVideoOn: boolean;
  isMicOn: boolean;
};

type Actions = {
  setMediaStream: (mediaStream: MediaStream | null) => void;
  setIsVideoOn: (isVideoOn: boolean) => void;
  setIsMicOn: (isMicOn: boolean) => void;
};

const useMediaStreamStore = create<States & Actions>((set) => ({
  mediaStream: null,
  isVideoOn: true,
  isMicOn: false,
  setMediaStream: (mediaStream) =>
    set(
      produce((draft: States) => {
        draft.mediaStream = mediaStream;
      }),
    ),
  setIsVideoOn: (isVideoOn) =>
    set(
      produce((draft: States) => {
        draft.isVideoOn = isVideoOn;
      }),
    ),
  setIsMicOn: (isMicOn) =>
    set(
      produce((draft: States) => {
        draft.isMicOn = isMicOn;
      }),
    ),
}));

export default useMediaStreamStore;
