const BASE_URL = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';
// API URL
const AUTH = 'auth';
const USER = 'users';
const ROOM = 'rooms';

// SOCKET URI
const ROOM_SOCKET = 'socket/room';
const LOBBY_SOCKET = 'socket/lobby';

export const PROPERTIES = {
  BASE_URL: `${BASE_URL}`,
  // API URL
  AUTH_URL: `${AUTH}`,
  GITHUB_LOGIN_URL: `${BASE_URL}/${AUTH}/github`,
  KAKAO_LOGIN_URL: `${BASE_URL}/${AUTH}/kakao`,
  USER_URL: `${USER}`,
  ROOM_URL: `${ROOM}`,

  // SOCKET URI
  ROOM_SOCKET_URI: `${BASE_URL}/${ROOM_SOCKET}`,
  LOBBY_SOCKET_URI: `${BASE_URL}/${LOBBY_SOCKET}`,
} as const;
