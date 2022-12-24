export interface User {
  id: string;
  email: string;
}
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

export interface AuthParams {
  email: string;
  password: string;
}
