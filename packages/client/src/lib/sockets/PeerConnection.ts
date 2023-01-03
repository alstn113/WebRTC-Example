import { Socket } from 'socket.io-client';
import { EVENT } from '~/constants';
import roomSocket from './roomSocket';

class PeerConnection {
  socket: Socket | null;
  peerConnection: RTCPeerConnection | null;

  constructor() {
    this.socket = roomSocket.socket;
    this.peerConnection = null;
  }
  createPeerConnection = (sid: string) => {
    const stream: MediaStream | null = null;
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302'],
        },
      ],
    });
    if (!this.peerConnection) return;
    this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        this.socket?.emit(EVENT.ICE_CANDIDATE, {
          to: sid,
          candidate: event.candidate,
        });
      }
    };

    this.peerConnection.ontrack = (event: RTCTrackEvent) => {
      console.log('ontrack', event.streams[0]);
    };

    stream?.getTracks().forEach((track) => {
      peerConnection?.addTrack(track, stream);
    });

    return peerConnection;
  };

  createOffer = async (sid: string) => {
    console.log('[createOffer]', this.peerConnection);
    this.peerConnection = this.createPeerConnection(sid) as RTCPeerConnection;
    if (!this.peerConnection) return;
    const offer = await this.peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await this.peerConnection.setLocalDescription(offer);
    this.socket?.emit(EVENT.CALL_USER, { to: sid, offer });
  };

  createAnswer = async ({ sid, offer }: { sid: string; offer: RTCSessionDescriptionInit }) => {
    console.log('[createAnswer]', this.peerConnection);
    if (!this.peerConnection) return;
    await this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);

    this.socket?.emit(EVENT.MAKE_ANSWER, { to: sid, answer });
  };

  onCallMade = async ({ sid, offer }: { sid: string; offer: RTCSessionDescriptionInit }) => {
    console.log('[onCallMade]', this.peerConnection);
    await this.createAnswer({ sid, offer });
  };

  onAnswerMade = async ({ sid, answer }: { sid: string; answer: RTCSessionDescriptionInit }) => {
    console.log('[onAnswerMade]', this.peerConnection);
    if (!this.peerConnection) return;
    await this.peerConnection.setRemoteDescription(answer);
  };

  onAddUser = async ({ sid }: { sid: string }) => {
    console.log('[onAddUser]', this.peerConnection);
    await this.createOffer(sid);
  };

  onIceCandidateReceived = ({
    sid,
    candidate,
  }: {
    sid: string;
    candidate: RTCIceCandidateInit;
  }) => {
    console.log('[onIceCandidateReceived]', this.peerConnection);
    if (!this.peerConnection) return;
    console.log(this.peerConnection);
    this.peerConnection.addIceCandidate(candidate);
  };
}

export default PeerConnection;
