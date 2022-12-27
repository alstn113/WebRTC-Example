import useGetRoomList from '~/hooks/queries/room/useGetRoomList';

interface Props {}

const RoomListContent = ({}: Props) => {
  const { data } = useGetRoomList();
  return (
    <>
      {data?.map((room) => {
        return (
          <div key={room.id}>
            <br />
            <div>Title: {room.title}</div>
            <div>Description: {room.description}</div>
          </div>
        );
      })}
    </>
  );
};

export default RoomListContent;
