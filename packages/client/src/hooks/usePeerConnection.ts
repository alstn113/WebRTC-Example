import { useEffect } from 'react';
import { EVENT } from '~/constants';
import roomSocket from '~/libs/sockets/roomSocket';
import useConnectedUsersStore from '~/libs/stores/useConnectedUsersStore';
import useMyMediaStreamStore from '~/libs/stores/useMyMediaStreamStore';
import usePeerConnectionStore from '~/libs/stores/usePeerConnectionStore';

const usePeerConnection = () => {
  const { myMediaStream } = useMyMediaStreamStore();
  const { setUserStream, addConnectedUser } = useConnectedUsersStore();
  const { peerConnections, setPeerConnection } = usePeerConnectionStore();
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
      console.log('[createPeerConnection]');
      try {
        const peerConnection = new RTCPeerConnection(RTCConfig);
        peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
          if (event.candidate) {
            roomSocket.socket?.emit(EVENT.SEND_ICE_CANDIDATE, {
              to: sid,
              candidate: event.candidate,
            });
          }
        };

        peerConnection.ontrack = (event: RTCTrackEvent) => {
          const stream = event.streams[0];
          setUserStream({ sid, stream });
        };

        myMediaStream?.getTracks().forEach((stream) => {
          peerConnection?.addTrack(stream, myMediaStream);
        });

        setPeerConnection({ sid, peerConnection });

        return peerConnection;
      } catch (error) {
        console.error('[CreatePeerConnection Error]', error);
      }
    };

    const createOffer = async (sid: string) => {
      console.log('[createOffer]');
      try {
        const peerConnection = createPeerConnection(sid);
        if (!peerConnection) return;

        const offer = await peerConnection.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });

        await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

        return offer;
      } catch (error) {
        console.error('[CreateOffer Error]', error);
      }
    };

    const createAnswer = async ({
      sid,
      offer,
    }: {
      sid: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      console.log('[createAnswer]');
      try {
        const peerConnection = createPeerConnection(sid);
        if (!peerConnection) return;

        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await peerConnection.createAnswer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        });
        await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

        roomSocket.socket?.emit(EVENT.SEND_ANSWER, { to: sid, answer });
      } catch (error) {
        console.error('[CreateAnswer Error]', error);
      }
    };

    const onNewUser = async ({ sid, uid }: { sid: string; uid: string }) => {
      console.log('[onNewUser]');
      try {
        addConnectedUser({ sid, uid });
        const offer = await createOffer(sid);
        roomSocket.socket?.emit(EVENT.NEW_USER, { to: sid, offer });
      } catch (error) {
        console.error('[OnNewUser Error]', error);
      }
    };

    const onReceivedOffer = async ({
      sid,
      offer,
    }: {
      sid: string;
      offer: RTCSessionDescriptionInit;
    }) => {
      console.log('[onReceivedOffer]');
      try {
        await createAnswer({ sid, offer });
      } catch (error) {
        console.error('[OnReceivedOffer Error]', error);
      }
    };

    const onReceivedAnswer = ({
      sid,
      answer,
    }: {
      sid: string;
      answer: RTCSessionDescriptionInit;
    }) => {
      console.log('[onReceivedAnswer]');
      try {
        const peerConnection = peerConnections[sid];
        if (!peerConnection) return;

        peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      } catch (error) {
        console.error('[OnReceivedAnswer Error]', error);
      }
    };

    const onReceivedIceCandidate = ({
      sid,
      candidate,
    }: {
      sid: string;
      candidate: RTCIceCandidateInit;
    }) => {
      console.log('[onReceivedIceCandidate]');
      try {
        const peerConnection = peerConnections[sid];
        if (!peerConnection) return;

        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error('[OnReceivedIceCandidate Error]', error);
      }
    };

    roomSocket.socket?.on(EVENT.NEW_USER, onNewUser);
    roomSocket.socket?.on(EVENT.RECEIVE_OFFER, onReceivedOffer);
    roomSocket.socket?.on(EVENT.RECEIVE_ANSWER, onReceivedAnswer);
    roomSocket.socket?.on(EVENT.RECEIVE_ICE_CANDIDATE, onReceivedIceCandidate);
    return () => {
      roomSocket.socket?.off(EVENT.NEW_USER, onNewUser);
      roomSocket.socket?.off(EVENT.RECEIVE_OFFER, onReceivedOffer);
      roomSocket.socket?.off(EVENT.RECEIVE_ANSWER, onReceivedAnswer);
      roomSocket.socket?.off(EVENT.RECEIVE_ICE_CANDIDATE, onReceivedIceCandidate);
    };
  }, [myMediaStream, peerConnections]);
};

export default usePeerConnection;
