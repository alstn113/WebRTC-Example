import { AuthParams, User } from '~/libs/types';
import apiClient from '~/libs/api/apiClient';
import { PROPERTIES } from '~/constants';

const UserAPI = {
  register: async ({ email, password }: AuthParams) => {
    const { data } = await apiClient.post(`${PROPERTIES.USER_URL}/register`, {
      email,
      password,
    });
    return data;
  },
  getMe: async (): Promise<User | null> => {
    try {
      const { data } = await apiClient.get(`${PROPERTIES.USER_URL}/me`);
      return data;
    } catch (e) {
      return null;
    }
  },
};

export default UserAPI;
