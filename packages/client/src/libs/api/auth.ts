import { PROPERTIES } from '~/constants';
import type { AuthParams } from '~/libs/types';
import apiClient from './apiClient';

const AuthAPI = {
  login: async ({ email, password }: AuthParams) => {
    const { data } = await apiClient.post(`${PROPERTIES.AUTH_URL}/login`, {
      email,
      password,
    });
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.delete(`${PROPERTIES.AUTH_URL}/logout`);
    return data;
  },
};

export default AuthAPI;
