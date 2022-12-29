import { io, Socket } from 'socket.io-client';
import { PROPERTIES } from '~/constants/properties';

class PeerConnection {
  peerConnections: { [key: string]: RTCPeerConnection } = {};
  senders: RTCRtpSender[] = [];
  listeners = {};
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  addPeerConnection(id: string, stream: MediaStream) {
    this.peerConnections[id] = new RTCPeerConnection({
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
    });

    stream.getTracks().forEach((track: MediaStreamTrack) => {
      this.senders.push(this.peerConnections[id].addTrack(track, stream));
    });
  }
}

export const createPeerConnectionContext = () => {
  const socket = io(PROPERTIES.BASE_URL);
  return new PeerConnection(socket);
};