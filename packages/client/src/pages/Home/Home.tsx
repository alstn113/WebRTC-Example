import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AsyncBoundary from '~/components/AsyncBoundary';
import { Button } from '~/components/common';
import ErrorFallback from '~/components/ErrorFallback';
import { MESSAGE } from '~/constants/messages';
import useLogout from '~/hooks/queries/auth/useLogout';
import useGetRoomList from '~/hooks/queries/room/useGetRoomList';
import useGetMe from '~/hooks/queries/user/useGetMe';
import useOpenLoginDialog from '~/hooks/useOpenLoginDialog';
import { User } from '~/libs/types';
import RoomListContent from './RoomListContent';

const Home = () => {
  const openLoginDialog = useOpenLoginDialog();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());
  const { mutate } = useLogout({
    onSuccess: () => {
      queryClient.invalidateQueries(useGetMe.getKey());
    },
  });
  const navigate = useNavigate();

  return (
    <div>
      <Button shadow color="secondary" onClick={openLoginDialog}>
        로그인
      </Button>
      <Button shadow color="error" onClick={() => mutate()}>
        로그아웃
      </Button>
      <div>{user?.user?.email}</div>
      <AsyncBoundary
        rejectedFallback={
          <ErrorFallback message={MESSAGE.ERROR.LOAD_DATA} queryKey={useGetRoomList.getKey()} />
        }
      >
        <RoomListContent />
      </AsyncBoundary>
      <Button shadow onClick={() => navigate('/lobby')}>
        LOBBY
      </Button>
    </div>
  );
};

export default Home;
