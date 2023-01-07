import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EVENT } from '~/constants';
import PeerConnection from '~/libs/sockets/PeerConnection';
import roomSocket from '~/libs/sockets/roomSocket';

const usePeerConnection = (roomId: string) => {
  const socket = roomSocket.socket;
  const RTCConfig = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  };
  useEffect(() => {
    const createPeerConnection = (sid: string) => {
      const peerConnection = new RTCPeerConnection(RTCConfig);

      return;
    };
    const createOffer = () => {
      return;
    };
    const createAnswer = () => {
      return;
    };
    const onReceivedOffer = () => {
      return;
    };
    const onReceivedAnswer = () => {
      return;
    };
    const onReceivedIceCandidate = () => {
      return;
    };
    const onReceivedCall = () => {
      return;
    };
  }, []);
};

export default usePeerConnection;
