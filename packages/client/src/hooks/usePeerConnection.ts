import { useEffect } from 'react';
import { EVENT } from '~/constants';
import PeerConnection from '~/lib/sockets/PeerConnection';
import roomSocket from '~/lib/sockets/roomSocket';

const usePeerConnection = () => {
  useEffect(() => {
    const peerConnection = new PeerConnection();

    roomSocket.socket?.on(EVENT.ADD_USER, peerConnection.onAddUser);
    roomSocket.socket?.on(EVENT.CALL_MADE, peerConnection.onCallMade);
    roomSocket.socket?.on(EVENT.ANSWER_MADE, peerConnection.onAnswerMade);
    roomSocket.socket?.on(EVENT.ICE_CANDIDATE, peerConnection.onIceCandidateReceived);
    return () => {
      roomSocket.socket?.off(EVENT.ADD_USER, peerConnection.onAddUser);
      roomSocket.socket?.off(EVENT.CALL_MADE, peerConnection.onCallMade);
      roomSocket.socket?.off(EVENT.ANSWER_MADE, peerConnection.onAnswerMade);
      roomSocket.socket?.off(EVENT.ICE_CANDIDATE, peerConnection.onIceCandidateReceived);
    };
  }, []);
};

export default usePeerConnection;
