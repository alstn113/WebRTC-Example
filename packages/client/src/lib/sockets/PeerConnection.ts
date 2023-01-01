import { Socket } from 'socket.io-client';
import { EVENT } from '~/constants';

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
  peerConnection: RTCPeerConnection | null = null;
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }
  createPeerConnection = (sid: string, stream: MediaStream | null) => {
    this.peerConnection = new RTCPeerConnection(PeerConfig);
    this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        this.socket.emit(EVENT.ICE_CANDIDATE, {
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

  createOffer = async (sid: string) => {
    if (!this.peerConnection) return;
    const offer = await this.peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await this.peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    this.socket.emit(EVENT.CALL_USER, { to: sid, offer });
  };

  createAnswer = async (sid: string, offer: RTCSessionDescriptionInit) => {
    if (!this.peerConnection) return;
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    this.socket.emit(EVENT.MAKE_ANSWER, { to: sid, answer });
  };

  onCallMade = async ({ sid, offer }: { sid: string; offer: RTCSessionDescriptionInit }) => {
    await this.createAnswer(sid, offer);
  };

  onAnswerMade = async ({ sid, answer }: { sid: string; answer: RTCSessionDescriptionInit }) => {
    if (!this.peerConnection) return;
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  onAddUser = async ({ sid, uid }: { sid: string; uid: string }) => {
    await this.createOffer(sid);
  };

  onIceCandidateReceived = ({
    sid,
    candidate,
  }: {
    sid: string;
    candidate: RTCIceCandidateInit;
  }) => {
    this.peerConnection?.addIceCandidate(new RTCIceCandidate(candidate));
  };

  disconnectConnection = () => {
    this.peerConnection?.close();
  };
}

export default PeerConnection;
