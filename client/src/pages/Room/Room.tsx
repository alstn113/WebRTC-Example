import { useParams } from 'react-router-dom';

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  return <div>Room</div>;
};

export default Room;
