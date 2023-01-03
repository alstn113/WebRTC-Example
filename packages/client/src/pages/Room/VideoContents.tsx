import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { EVENT } from '~/constants';
import roomSocket from '~/lib/sockets/roomSocket';

const VideoContents = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>(null);
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
      if (!(pcRef.current && socket)) return;

      stream.getTracks().forEach((track) => {
        if (!pcRef.current) return;
        pcRef.current.addTrack(track, stream);
      });
      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socket) return;
          console.log('candidate', e.candidate);
          socket.emit(EVENT.ICE_CANDIDATE, e.candidate);
        }
      };
      pcRef.current.oniceconnectionstatechange = (e) => {
        console.log('ice connection state change', e);
      };
      pcRef.current.ontrack = (e) => {
        console.log('add track success');
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0];
        socket.emit(EVENT.JOIN_ROOM, {
          roomId: 'test',
        });
      };
    } catch (e) {
      console.error(e);
    }
    return;
  };

  const createOffer = async () => {
    return;
  };

  const createAnswer = async () => {
    return;
  };

  useEffect(() => {
    return;
  }, []);

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
