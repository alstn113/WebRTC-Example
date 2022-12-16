import axios from 'axios';
import { PROPERTIES } from '~/constants/properties';

const apiClient = axios.create({
  baseURL: PROPERTIES.BASE_URL,
  // withCredentials: true, // able to use cookies
});

export default apiClient;
