import produce from 'immer';
import { create } from 'zustand';

type States = {
  myMediaStream: MediaStream | null;
  isMyVideoOn: boolean;
  isMyMicOn: boolean;
  myVideoInputDevice: MediaDeviceInfo | null;
  myAudioInputDevice: MediaDeviceInfo | null;
  myAudioOutputDevice: MediaDeviceInfo | null;
};

type Actions = {
  setMyMediaStream: (mediaStream: MediaStream | null) => void;
  setIsMyVideoOn: (isMyVideoOn: boolean) => void;
  setIsMyMicOn: (isMyMicOn: boolean) => void;
  setMyVideoInputDevice: (myVideoInputDevice: MediaDeviceInfo | null) => void;
  setMyAudioInputDevice: (myAudioInputDevice: MediaDeviceInfo | null) => void;
  setMyAudioOutputDevice: (myAudioOutputDevice: MediaDeviceInfo | null) => void;
};

const useMyMediaStreamStore = create<States & Actions>((set) => ({
  myMediaStream: null,
  isMyMicOn: true,
  isMyVideoOn: true,
  myVideoInputDevice: null,
  myAudioInputDevice: null,
  myAudioOutputDevice: null,
  setMyMediaStream: (mediaStream) =>
    set(
      produce((draft: States) => {
        draft.myMediaStream = mediaStream;
      }),
    ),
  setIsMyVideoOn: (isMyVideoOn) =>
    set(
      produce((draft: States) => {
        draft.isMyVideoOn = isMyVideoOn;
      }),
    ),
  setIsMyMicOn: (isMyMicOn) =>
    set(
      produce((draft: States) => {
        draft.isMyMicOn = isMyMicOn;
      }),
    ),
  setMyVideoInputDevice: (myVideoInputDevice) =>
    set(
      produce((draft: States) => {
        draft.myVideoInputDevice = myVideoInputDevice;
      }),
    ),

  setMyAudioInputDevice: (myAudioInputDevice) =>
    set(
      produce((draft: States) => {
        draft.myAudioInputDevice = myAudioInputDevice;
      }),
    ),
  setMyAudioOutputDevice: (myAudioOutputDevice) =>
    set(
      produce((draft: States) => {
        draft.myAudioOutputDevice = myAudioOutputDevice;
      }),
    ),
}));

export default useMyMediaStreamStore;
