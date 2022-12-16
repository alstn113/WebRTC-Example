export interface CreateRoomParams {
  title: string;
  password?: string;
}

export interface Room {
  id: string;
  title: string;
  password?: string;
}

export interface RoomList {
  roomList: Room[];
}
