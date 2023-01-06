import apiClient from '~/lib/api/apiClient';
import { CreateRoomParams, Room, RoomList } from '~/lib/types';

const RoomAPI = {
  getRoom: async (roomId: string) => {
    const { data } = await apiClient.get<Room>(`/rooms/${roomId}`);
    return data;
  },
  getRoomList: async () => {
    const { data } = await apiClient.get<RoomList>('/rooms');
    return data;
  },
  createRoom: async (params: CreateRoomParams) => {
    const { data } = await apiClient.post('/rooms', params);
    return data;
  },
  deleteRoom: async (roomId: string) => {
    const { data } = await apiClient.delete(`/rooms/${roomId}`);
    return data;
  },
};

export default RoomAPI;
