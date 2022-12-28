import { Link } from 'react-router-dom';
import useGetRoomList from '~/hooks/queries/room/useGetRoomList';

const RoomListContent = () => {
  const { data } = useGetRoomList();
  return (
    <>
      {data?.map((room) => {
        return (
          <div key={room.id}>
            <Link to={`/room/${room.id}`}>
              <br />
              <div>Title: {room.title}</div>
              <div>Description: {room.description}</div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default RoomListContent;
