export const EVENT = {
  /** Socket Chat */
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message',

  /** WebRTC */
  CALL_USER: 'call_user',
  MAKE_ANSWER: 'make_answer',
  ICE_CANDIDATE: 'ice_candidate',
} as const;

export type Event = typeof EVENT[keyof typeof EVENT];
