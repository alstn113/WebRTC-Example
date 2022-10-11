import axios from 'axios';
import { PROPERTIES } from '~/constants/properties';

const apiClient = axios.create({
  baseURL: PROPERTIES.BASE_URL,
  withCredentials: true,
});

export default apiClient;

export const setClientCookie = (cookie: string) => {
  apiClient.defaults.headers.common['Cookie'] = cookie;
};
