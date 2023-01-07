import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { EVENT } from '~/constants';
import roomSocket from '~/libs/sockets/roomSocket';

interface Props {
  roomId: string;
}
const VideoContents = ({ roomId }: Props) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>();
  const socket = roomSocket.socket;

  const setVideoTracks = async () => {
    console.log('setVideoTracks');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (localVideoRef.current) {
        // remove howling sound
        localVideoRef.current.volume = 0;
        localVideoRef.current.srcObject = stream;
      }

      if (!(pcRef.current && socket)) return;
      stream?.getTracks().forEach((track) => {
        if (!pcRef.current) return;
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          if (!socket) return;
          socket.emit(EVENT.ICE_CANDIDATE, {
            to: roomId,
            candidate: event.candidate,
          });
        }
      };
      pcRef.current.ontrack = (event: RTCTrackEvent) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      socket.emit(EVENT.JOIN_ROOM, {
        roomId,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async (sid: string) => {
    console.log('createOffer');

    if (!(pcRef.current && socket)) return;
    try {
      const offer = await pcRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pcRef.current.setLocalDescription(new RTCSessionDescription(offer));
      socket.emit(EVENT.CALL_USER, {
        to: roomId,
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
    console.log('createAnswer');

    if (!(pcRef.current && socket)) return;
    try {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pcRef.current.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pcRef.current.setLocalDescription(new RTCSessionDescription(answer));
      socket.emit(EVENT.MAKE_ANSWER, {
        to: roomId,
        answer,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onCallMade = async ({ sid, offer }: { sid: string; offer: RTCSessionDescriptionInit }) => {
    console.log('onCallMade');

    await createAnswer({ sid, offer });
  };

  const onAnswerMade = async ({
    sid,
    answer,
  }: {
    sid: string;
    answer: RTCSessionDescriptionInit;
  }) => {
    console.log('onAnswerMade');

    if (!pcRef.current) return;
    pcRef.current?.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const onCallUser = async ({ sid }: { sid: string }) => {
    await createOffer(sid);
  };

  const onIceCandidateReceived = ({
    sid,
    candidate,
  }: {
    sid: string;
    candidate: RTCIceCandidateInit;
  }) => {
    console.log('onIceCandidateReceived');

    if (!pcRef.current) return;
    pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
  };

  useEffect(() => {
    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });

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

      if (pcRef.current) pcRef.current.close();
    };
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
  width: 300px;
  height: 300px;
  & + & {
    margin-left: 1rem;
  }
  background-color: #000;
`;
