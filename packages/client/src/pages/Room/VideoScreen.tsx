import { useQueryClient } from '@tanstack/react-query';
import useGetMe from '~/hooks/queries/user/useGetMe';
import { ConnectedUserInfo, User } from '~/libs/types';

interface Props {
  connectedUser: ConnectedUserInfo;
  stream: MediaStream | null;
}

const VideoScreen = ({ connectedUser, stream }: Props) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());
  return <div>VideoScreen</div>;
};

export default VideoScreen;
