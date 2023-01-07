import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import useGetRoomList from '~/hooks/queries/room/useGetRoomList';

const RoomListContent = () => {
  const { data } = useGetRoomList();
  return (
    <Container>
      {data?.map((room) => {
        return (
          <Link key={room.id} to={`/room/${room.id}`}>
            <Card>
              <h1>{room.title}</h1>
              <h2>{room.description}</h2>
            </Card>
          </Link>
        );
      })}
    </Container>
  );
};

export default RoomListContent;

const Container = styled.div`
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
  width: 200px;
  height: 150px;
  border-radius: 5px;
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
