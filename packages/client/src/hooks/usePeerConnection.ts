import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { EVENT } from '~/constants';
import PeerConnection from '~/lib/sockets/PeerConnection';

const usePeerConnection = (socket: Socket) => {
  useEffect(() => {
    const peerConnection = new PeerConnection(socket);

    socket.on(EVENT.CALL_MADE, peerConnection.onCallMade);
    socket.on(EVENT.ANSWER_MADE, peerConnection.onAnswerMade);
    socket.on(EVENT.ICE_CANDIDATE, peerConnection.onIceCandidateReceived);
    return () => {
      peerConnection.peerConnection?.close();
      socket.off(EVENT.CALL_MADE, peerConnection.onCallMade);
      socket.off(EVENT.ANSWER_MADE, peerConnection.onAnswerMade);
      socket.off(EVENT.ICE_CANDIDATE, peerConnection.onIceCandidateReceived);
    };
  }, []);
};

export default usePeerConnection;
