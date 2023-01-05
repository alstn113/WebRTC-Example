export const EVENT = {
  /** Socket Room */
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',

  /** Socket Lobby */
  JOIN_LOBBY: 'join_lobby',
  LEAVE_LOBBY: 'leave_lobby',

  /** Socket Chat */
  CHAT_MESSAGE: 'chat_message',

  /** WebRTC */
  CALL_USER: 'call_user',
  MAKE_ANSWER: 'make_answer',
  ICE_CANDIDATE: 'ice_candidate',
  CALL_MADE: 'call_made',
  ANSWER_MADE: 'answer_made',
} as const;

export type Event = typeof EVENT[keyof typeof EVENT];
