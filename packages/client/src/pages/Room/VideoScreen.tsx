import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import useGetMe from '~/hooks/queries/user/useGetMe';
import { ConnectedUserInfo, User } from '~/libs/types';

interface Props {
  connectedUser: {
    uid: string | undefined;
    sid?: string;
  };
  stream: MediaStream | null;
}

const VideoScreen = ({ connectedUser, stream }: Props) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());

  const videoRef = useRef<HTMLVideoElement | null>(null);

  return <Container>VideoScreen</Container>;
};

const Container = styled.video`
  width: 300px;
  height: 300px;
  background-color: #000;
`;

export default VideoScreen;
