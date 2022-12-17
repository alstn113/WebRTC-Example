import useGetRoomList from '~/hooks/queries/room/useGetRoomList';

interface Props {}

const RoomListContent = ({}: Props) => {
  const { data } = useGetRoomList();
  return <div>{JSON.stringify(data)}</div>;
};

export default RoomListContent;
