import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { EVENT } from '~/constants';
import roomSocket from '~/lib/sockets/roomSocket';
import usePeerConnectionStore from '~/lib/stores/usePeerConnectionStore';

const VideoContents = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { peerConnection, setPeerConnection } = usePeerConnectionStore();
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

      stream.getTracks().forEach((track) => {
        if (!peerConnection) return;
        peerConnection.addTrack(track, stream);
      });
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
        socket.emit(EVENT.JOIN_ROOM, {
          roomId: 'test',
        });
      };
    } catch (error) {
      console.error(error);
    }
    return;
  };

  const createOffer = async () => {
    console.log('create offer');
    if (!(peerConnection && socket)) return;
    try {
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
      socket.emit(EVENT.CALL_USER, {
        offer,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createAnswer = async (offer: RTCSessionDescription) => {
    if (!(peerConnection && socket)) return;
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
      socket.emit(EVENT.MAKE_ANSWER, {
        answer,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setPeerConnection(
      new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          },
        ],
      }),
    );

    socket?.on(EVENT.CALL_USER, () => {
      createOffer();
    });

    socket?.on(EVENT.CALL_MADE, ({ sid, offer }: { sid: string; offer: RTCSessionDescription }) => {
      console.log('call made', sid, offer);
      createAnswer(offer);
    });

    socket?.on(
      EVENT.ANSWER_MADE,
      ({ sid, answer }: { sid: string; answer: RTCSessionDescription }) => {
        console.log('answer made', sid, answer);
        if (!peerConnection) return;
        peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      },
    );

    socket?.on(
      EVENT.ICE_CANDIDATE,
      ({ sid, candidate }: { sid: string; candidate: RTCIceCandidate }) => {
        if (!peerConnection) return;
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        console.log('ice candidate', sid, candidate);
      },
    );

    setVideoTracks();

    return () => {
      if (socket) socket.close();
      if (peerConnection) peerConnection.close();
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
