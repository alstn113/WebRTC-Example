import produce from 'immer';
import create from 'zustand';

interface ConnectedUserInfo {
  sid: string;
  uid: string;
}

type States = {
  userStreams: { [key: string]: MediaStream | null };
  connectedUsers: ConnectedUserInfo[];
};

type Actions = {
  setUserStream: ({ sid, stream }: { sid: string; stream: MediaStream }) => void;
  setConnectedUsers: (connectedUsers: ConnectedUserInfo[]) => void;
  addConnectedUser: (connectedUser: ConnectedUserInfo) => void;
  deleteConnectedUser: (sid: string) => void;
};

const useConnectedUsersStore = create<States & Actions>((set) => ({
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
}));

export default useConnectedUsersStore;
