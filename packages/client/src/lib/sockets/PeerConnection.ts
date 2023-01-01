import { io, Socket } from 'socket.io-client';
import { EVENT } from '~/constants';
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
  peerConnection: RTCPeerConnection | null;

  constructor() {
    this.peerConnection = null;
  }

  createPeerConnection = (socket: Socket, sid: string, stream: MediaStream | null) => {
    this.peerConnection = new RTCPeerConnection(PeerConfig);
    this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        socket.emit(EVENT.ICE_CANDIDATE, {
          to: sid,
          candidate: event.candidate,
        });
      }
    };

    this.peerConnection.ontrack = (event: RTCTrackEvent) => {
      console.log('ontrack', event.streams[0]);
    };

    stream?.getTracks().forEach((track) => {
      this.peerConnection?.addTrack(track, stream);
    });

    return this.peerConnection;
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
