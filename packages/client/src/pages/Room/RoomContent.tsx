import useGetRoom from '~/hooks/queries/room/useGetRoom';

interface Props {
  roomId: string;
}

const RoomContent = ({ roomId }: Props) => {
  const { data } = useGetRoom(roomId);
  return (
    <div>
      <div>{data?.title}</div>
      <div>{data?.description}</div>
    </div>
  );
};

export default RoomContent;
