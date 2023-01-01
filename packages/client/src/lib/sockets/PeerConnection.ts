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
  createPeerConnection = (socket: Socket, sid: string, stream: MediaStream | null) => {
    const peerConnection = new RTCPeerConnection(PeerConfig);
    peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        socket.emit(EVENT.ICE_CANDIDATE, {
          to: sid,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event: RTCTrackEvent) => {
      console.log('ontrack', event.streams[0]);
    };

    stream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });

    return peerConnection;
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
