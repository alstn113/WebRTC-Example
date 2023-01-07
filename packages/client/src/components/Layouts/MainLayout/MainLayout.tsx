import { useQueryClient } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '~/components/common';
import useGetMe from '~/hooks/queries/user/useGetMe';
import { User } from '~/libs/types';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { FullHeightScreen } from './MainLayout.styles';
import * as S from './MainLayout.styles';
import useLogout from '~/hooks/queries/auth/useLogout';

const MainLayout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());

  const { mutate } = useLogout({
    onSuccess: () => {
      queryClient.refetchQueries(useGetMe.getKey()).then(() => {
        navigate('/');
      });
    },
  });
  return (
    <>
      <FullHeightScreen>
        <Header
          headerRight={
            user?.user ? (
              <S.ButtonWrapper>
                <Button shadow>{user?.user?.email}</Button>
                <Button shadow color="error" onClick={() => mutate()}>
                  로그아웃
                </Button>
              </S.ButtonWrapper>
            ) : (
              <Button onClick={() => navigate('/login')}>로그인</Button>
            )
          }
        />
        <Outlet />
      </FullHeightScreen>
      <Footer />
    </>
  );
};

export default MainLayout;
