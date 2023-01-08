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
    peerConnection: RTCPeerConnection | null;
  }) => void;
  setPeerConnectionsEmpty: () => void;
};

const usePeerConnectionStore = create<States & Actions>((set) => ({
  peerConnections: {},
  setPeerConnection: ({ sid, peerConnection }) =>
    set(
      produce((draft: States) => {
        draft.peerConnections[sid] = peerConnection;
      }),
    ),
  setPeerConnectionsEmpty: () =>
    set(
      produce((draft: States) => {
        draft.peerConnections = {};
      }),
    ),
}));

export default usePeerConnectionStore;
