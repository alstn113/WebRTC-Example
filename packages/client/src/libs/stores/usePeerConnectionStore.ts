import produce from 'immer';
import create from 'zustand';

type States = {
  peerConnections: { [key: string]: RTCPeerConnection | null };
};

type Actions = {
  setPeerConnection: ({
    sid,
    peerConnection,
  }: {
    sid: string;
    peerConnection: RTCPeerConnection;
  }) => void;
  setEmpty: () => void;
};

const usePeerConnectionStore = create<States & Actions>((set) => ({
  peerConnections: {},
  setPeerConnection: ({ sid, peerConnection }) =>
    set(
      produce((draft: States) => {
        draft.peerConnections[sid] = peerConnection;
      }),
    ),
  setEmpty: () =>
    set(
      produce((draft: States) => {
        draft.peerConnections = {};
      }),
    ),
}));

export default usePeerConnectionStore;
