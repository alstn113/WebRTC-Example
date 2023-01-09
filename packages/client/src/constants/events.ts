export const EVENT = {
  /** Socket Room */
  JOIN_ROOM: 'join_room',
  JOINED_ROOM: 'joined_room',
  LEAVE_ROOM: 'leave_room',
  LEFT_ROOM: 'left_room',
  EXISTING_ROOM_USERS: 'existing_room_users',

  /** Socket Lobby */
  JOIN_LOBBY: 'join_lobby',
  JOINED_LOBBY: 'joined_lobby',
  LEAVE_LOBBY: 'leave_lobby',
  LEFT_LOBBY: 'left_lobby',

  /** Socket Chat */
  CHAT_MESSAGE: 'chat_message',

  /** WebRTC */
  NEW_USER: 'new_user',
  RECEIVE_OFFER: 'receive_offer',
  SEND_ANSWER: 'send_answer',
  RECEIVE_ANSWER: 'receive_answer',
  SEND_ICE_CANDIDATE: 'send_ice_candidate',
  RECEIVE_ICE_CANDIDATE: 'receive_ice_candidate',
  MEDIA_STATE_CHANGE: 'media_state_change',
} as const;

export type Event = typeof EVENT[keyof typeof EVENT];
