import axios from 'axios';
import { PROPERTIES } from '~/constants/properties';

const apiClient = axios.create({
  baseURL: PROPERTIES.BASE_URL,
  withCredentials: true,
});

export default apiClient;
