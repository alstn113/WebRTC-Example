import { PROPERTIES } from '~/constants';
import apiClient from '~/libs/api/apiClient';
import { CreateRoomParams, Room, RoomList } from '~/libs/types';

const RoomAPI = {
  getRoom: async (roomId: string) => {
    const { data } = await apiClient.get<Room>(`${PROPERTIES.ROOM_URL}/${roomId}`);
    return data;
  },
  getRoomList: async () => {
    const { data } = await apiClient.get<RoomList>(`${PROPERTIES.ROOM_URL}`);
    return data;
  },
  createRoom: async (params: CreateRoomParams) => {
    const { data } = await apiClient.post(`${PROPERTIES.ROOM_URL}`, params);
    return data;
  },
  deleteRoom: async (roomId: string) => {
    const { data } = await apiClient.delete(`${PROPERTIES.ROOM_URL}/${roomId}`);
    return data;
  },
};

export default RoomAPI;
