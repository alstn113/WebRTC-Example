import { User } from '~/lib/types';
import apiClient from '~/lib/api/apiClient';

const UserAPI = {
  getMe: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get('/user/me');
      return data;
    } catch (e) {
      return null;
    }
  },
};

export default UserAPI;
