import useGetRoom from '~/hooks/queries/room/useGetRoom';

interface Props {
  roomId: string;
}

const RoomContent = ({ roomId }: Props) => {
  const { data } = useGetRoom(roomId);
  return <div>{JSON.stringify(data)}</div>;
};

export default RoomContent;
