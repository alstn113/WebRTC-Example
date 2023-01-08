import produce from 'immer';
import create from 'zustand';
import { ConnectedUserInfo } from '../types';

type States = {
  userStreams: { [key: string]: MediaStream | null };
  connectedUsers: ConnectedUserInfo[];
};

type Actions = {
  setUserStream: ({ sid, stream }: { sid: string; stream: MediaStream }) => void;
  setConnectedUsers: (connectedUsers: ConnectedUserInfo[]) => void;
  addConnectedUser: (connectedUser: ConnectedUserInfo) => void;
  deleteConnectedUser: (sid: string) => void;
  findUserBySid: (sid: string) => ConnectedUserInfo | undefined;
  findUserByUid: (sid: string) => ConnectedUserInfo | undefined;
};

const useConnectedUsersStore = create<States & Actions>((set, get) => ({
  userStreams: {},
  connectedUsers: [],
  setUserStream: ({ sid, stream }) =>
    set(
      produce((draft: States) => {
        draft.userStreams[sid] = stream;
      }),
    ),
  setConnectedUsers: (connectedUsers) =>
    set(
      produce((draft: States) => {
        draft.connectedUsers = connectedUsers;
      }),
    ),
  addConnectedUser: (connectedUser) =>
    set(
      produce((draft: States) => {
        draft.connectedUsers.push(connectedUser);
      }),
    ),
  deleteConnectedUser: (sid) =>
    set(
      produce((draft: States) => {
        draft.connectedUsers = draft.connectedUsers.filter((user) => user.sid !== sid);
      }),
    ),
  findUserBySid: (sid) => {
    const { connectedUsers } = get();
    return connectedUsers.find((user) => user.sid === sid);
  },
  findUserByUid: (uid) => {
    const { connectedUsers } = get();
    return connectedUsers.find((user) => user.uid === uid);
  },
}));

export default useConnectedUsersStore;
