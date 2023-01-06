import { AuthParams, User } from '~/libs/types';
import apiClient from '~/libs/api/apiClient';

const UserAPI = {
  register: async ({ email, password }: AuthParams) => {
    const { data } = await apiClient.post('/users/register', {
      email,
      password,
    });
    return data;
  },
  getMe: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get('/users/me');
      return data;
    } catch (e) {
      return null;
    }
  },
};

export default UserAPI;
