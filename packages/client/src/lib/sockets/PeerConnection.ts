import { Socket } from 'socket.io-client';
import { EVENT } from '~/constants';
import roomSocket from './roomSocket';

class PeerConnection {
  socket: Socket | null;

  constructor() {
    this.socket = roomSocket.socket;
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
    peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        this.socket?.emit(EVENT.ICE_CANDIDATE, {
          to: sid,
          candidate: event.candidate,
        });
      }
    };

    peerConnection.ontrack = (event: RTCTrackEvent) => {
      console.log('ontrack', event.streams[0]);
    };

    stream?.getTracks().forEach((track) => {
      peerConnection?.addTrack(track, stream);
    });

    return peerConnection;
  };

  createOffer = async (sid: string) => {
    // console.log('[createOffer]');
    const peerConnection = this.createPeerConnection(sid);
    if (!peerConnection) return;
    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await peerConnection.setLocalDescription(offer);
    this.socket?.emit(EVENT.CALL_USER, { to: sid, offer });
  };

  createAnswer = async ({ sid, offer }: { sid: string; offer: RTCSessionDescriptionInit }) => {
    // console.log('[createAnswer]');
    const peerConnection = this.createPeerConnection(sid);
    if (!peerConnection) return;
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    this.socket?.emit(EVENT.MAKE_ANSWER, { to: sid, answer });
  };

  onCallMade = async ({ sid, offer }: { sid: string; offer: RTCSessionDescriptionInit }) => {
    // console.log('[onCallMade]');
    await this.createAnswer({ sid, offer });
  };

  onAnswerMade = async ({ sid, answer }: { sid: string; answer: RTCSessionDescriptionInit }) => {
    // console.log('[onAnswerMade]');
    const peerConnection = this.createPeerConnection(sid);
    if (!peerConnection) return;
    await peerConnection.setRemoteDescription(answer);
  };

  onAddUser = async ({ sid }: { sid: string }) => {
    // console.log('[onAddUser]');
    await this.createOffer(sid);
  };

  onIceCandidateReceived = ({
    sid,
    candidate,
  }: {
    sid: string;
    candidate: RTCIceCandidateInit;
  }) => {
    // console.log('[onIceCandidateReceived]');
    const peerConnection = this.createPeerConnection(sid);
    if (!peerConnection) return;
    peerConnection?.addIceCandidate(candidate);
  };
}

export default PeerConnection;
