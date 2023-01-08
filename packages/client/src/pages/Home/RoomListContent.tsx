import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useGetRoomList from '~/hooks/queries/room/useGetRoomList';
import useGetMe from '~/hooks/queries/user/useGetMe';
import useOpenLoginDialog from '~/hooks/useOpenLoginDialog';
import { User } from '~/libs/types';

const RoomListContent = () => {
  const { data } = useGetRoomList();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());
  const openLoginDialog = useOpenLoginDialog();

  const handleCheckAuth = (roomId: string) => {
    if (!user?.user) return openLoginDialog();
    return navigate(`/room/${roomId}`);
  };
  return (
    <AnimatePresence>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {data?.map((room) => {
          return (
            <Card key={room.id} onClick={() => handleCheckAuth(room.id)}>
              <h1>{room.title}</h1>
              <h2>{room.description}</h2>
            </Card>
          );
        })}
      </Container>
    </AnimatePresence>
  );
};

export default RoomListContent;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 200px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 12px 20px 6px rgba(0, 0, 0, 0.1);
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
  }
  h2 {
    margin-top: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
`;
