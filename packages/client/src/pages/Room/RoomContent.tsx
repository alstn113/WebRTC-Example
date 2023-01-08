import useGetRoom from '~/hooks/queries/room/useGetRoom';

interface Props {
  roomId: string;
}

const RoomContent = ({ roomId }: Props) => {
  const { data } = useGetRoom(roomId);
  return (
    <div>
      {data?.title} - {data?.description}
    </div>
  );
};

export default RoomContent;
