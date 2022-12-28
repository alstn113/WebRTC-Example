export interface User {
  user: {
    id: string;
    email: string;
  };
}

export interface CreateRoomParams {
  title: string;
  description: string;
}

export interface Room {
  id: string;
  title: string;
  description: string;
}

export type RoomList = Room[];

export interface AuthParams {
  email: string;
  password: string;
}
