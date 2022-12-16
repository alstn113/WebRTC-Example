import RoomAPI from '~/lib/api/room';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetRoomList = (
  options: UseQueryOptionsOf<typeof RoomAPI.getRoomList> = {},
) => {
  return useQuery(getKey(), fetcher(), options);
};

const getKey = () => ['GetRoomList'];
const fetcher = () => () => RoomAPI.getRoomList();

useGetRoomList.getKey = getKey;
useGetRoomList.fetcher = fetcher;

export default useGetRoomList;
