import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { EVENT } from '~/constants';
import roomSocket from '~/lib/sockets/roomSocket';
import usePeerConnectionStore from '~/lib/stores/usePeerConnectionStore';

const VideoContents = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { sid, peerConnection, setPeerConnection, setEmpty } = usePeerConnectionStore();
  const socket = roomSocket.socket;

  const setVideoTracks = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: 'user',
        },
      });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      if (!(peerConnection && socket)) return;

      peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socket) return;
          console.log('candidate', e.candidate);
          socket.emit(EVENT.ICE_CANDIDATE, e.candidate);
        }
      };
      peerConnection.oniceconnectionstatechange = (e) => {
        console.log('ice connection state change', e);
      };

      peerConnection.ontrack = (e) => {
        console.log('add track success');
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0];
      };

      stream.getTracks().forEach((track) => {
        if (!peerConnection) return;
        peerConnection.addTrack(track, stream);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createOffer = async (sid: string) => {
    console.log('create offer');
    if (!(peerConnection && socket)) return;
    try {
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
      socket.emit(EVENT.CALL_USER, {
        to: sid,
        offer,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createAnswer = async ({
    sid,
    offer,
  }: {
    sid: string;
    offer: RTCSessionDescriptionInit;
  }) => {
    if (!(peerConnection && socket)) return;
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
      socket.emit(EVENT.MAKE_ANSWER, {
        to: sid,
        answer,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onCallMade = async ({ sid, offer }: { sid: string; offer: RTCSessionDescriptionInit }) => {
    await createAnswer({ sid, offer });
  };

  const onAnswerMade = async ({
    sid,
    answer,
  }: {
    sid: string;
    answer: RTCSessionDescriptionInit;
  }) => {
    console.log('answer made', sid, answer);
    if (!peerConnection) return;
    peerConnection?.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const onCallUser = async ({ sid }: { sid: string }) => {
    setPeerConnection({
      sid,
      peerConnection: new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          },
        ],
      }),
    });
    await createOffer(sid);
  };

  const onIceCandidateReceived = ({
    sid,
    candidate,
  }: {
    sid: string;
    candidate: RTCIceCandidateInit;
  }) => {
    if (!peerConnection) return;
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    console.log('ice candidate', sid, candidate);
  };

  useEffect(() => {
    socket?.on(EVENT.CALL_USER, onCallUser);
    socket?.on(EVENT.CALL_MADE, onCallMade);
    socket?.on(EVENT.ANSWER_MADE, onAnswerMade);
    socket?.on(EVENT.ICE_CANDIDATE, onIceCandidateReceived);

    setVideoTracks();

    return () => {
      socket?.off(EVENT.CALL_USER, onCallUser);
      socket?.off(EVENT.CALL_MADE, onCallMade);
      socket?.off(EVENT.ANSWER_MADE, onAnswerMade);
      socket?.off(EVENT.ICE_CANDIDATE, onIceCandidateReceived);
      setEmpty();
    };
  }, [socket]);

  return (
    <VideoContainer>
      <VideoScreen autoPlay ref={localVideoRef} />
      <VideoScreen autoPlay ref={remoteVideoRef} />
    </VideoContainer>
  );
};

export default VideoContents;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const VideoScreen = styled.video`
  width: 360px;
  height: 360px;
  margin: 2rem;
  background-color: #000;
`;
