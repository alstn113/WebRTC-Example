import produce from 'immer';
import create from 'zustand';

type States = {
  sid: string | null;
  peerConnection: RTCPeerConnection | null;
};

type Actions = {
  setPeerConnection: ({
    sid,
    peerConnection,
  }: {
    sid: string;
    peerConnection: RTCPeerConnection | null;
  }) => void;
  setEmpty: () => void;
};

const usePeerConnectionStore = create<States & Actions>((set) => ({
  sid: null,
  peerConnection: null,
  setPeerConnection: ({ sid, peerConnection }) =>
    set(
      produce((draft: States) => {
        draft.sid = sid;
        draft.peerConnection = peerConnection;
      }),
    ),
  setEmpty: () =>
    set(
      produce((draft: States) => {
        draft.sid = null;
        draft.peerConnection = null;
      }),
    ),
}));

export default usePeerConnectionStore;
