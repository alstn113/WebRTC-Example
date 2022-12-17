import { useParams } from 'react-router-dom';
import AsyncBoundary from '~/components/AsyncBoundary';
import ErrorFallback from '~/components/ErrorFallback';
import { MESSAGE } from '~/constants/messages';
import useGetRoom from '~/hooks/queries/room/useGetRoom';
import RoomContent from './RoomContent';

const Room = () => {
  const { roomId } = useParams() as { roomId: string };
  return (
    <AsyncBoundary
      rejectedFallback={
        <ErrorFallback
          message={MESSAGE.ERROR.LOAD_DATA}
          queryKey={useGetRoom.getKey(roomId)}
        />
      }
    >
      <RoomContent roomId={roomId} />
    </AsyncBoundary>
  );
};

export default Room;
