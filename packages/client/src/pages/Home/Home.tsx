import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import AsyncBoundary from '~/components/AsyncBoundary';
import { Button } from '~/components/common';
import ErrorFallback from '~/components/ErrorFallback';
import { MESSAGE } from '~/constants/messages';
import useGetRoomList from '~/hooks/queries/room/useGetRoomList';
import useOpenLoginDialog from '~/hooks/useOpenLoginDialog';
import RoomListContent from './RoomListContent';

const Home = () => {
  const navigate = useNavigate();
  const openLoginDialog = useOpenLoginDialog();

  return (
    <Container>
      <ButtonWrapper>
        <Button shadow color="secondary" onClick={openLoginDialog}>
          로그인 모달
        </Button>
        <Button shadow onClick={() => navigate('/lobby')}>
          LOBBY
        </Button>
      </ButtonWrapper>
      <AsyncBoundary
        rejectedFallback={
          <ErrorFallback message={MESSAGE.ERROR.LOAD_DATA} queryKey={useGetRoomList.getKey()} />
        }
      >
        <RoomListContent />
      </AsyncBoundary>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export default Home;
