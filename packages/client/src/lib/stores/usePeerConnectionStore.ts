import produce from 'immer';
import create from 'zustand';

type States = {
  peerConnection: RTCPeerConnection | null;
};

type Actions = {
  setPeerConnection: (peerConnection: RTCPeerConnection) => void;
};

const usePeerConnectionStore = create<States & Actions>((set) => ({
  peerConnection: null,
  setPeerConnection: (peerConnection: RTCPeerConnection) =>
    set(
      produce((draft: States) => {
        draft.peerConnection = peerConnection;
      }),
    ),
}));

export default usePeerConnectionStore;
