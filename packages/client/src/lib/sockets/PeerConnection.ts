import { io, Socket } from 'socket.io-client';
import { PROPERTIES } from '~/constants/properties';

const PeerConfig = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302',
      ],
    },
  ],
};

class PeerConnection {
  createPeerConnection = (socket: Socket) => {
    const peerConnection = new RTCPeerConnection(PeerConfig);
  };

  createOffer = (socket: Socket) => {
    return;
  };

  onCallMade = (socket: Socket) => {
    return;
  };

  createAnswer = (socket: Socket) => {
    return;
  };

  onAnswerMade = (socket: Socket) => {
    return;
  };

  onIceCandidateReceived = (socket: Socket) => {
    return;
  };
}

export default PeerConnection;
