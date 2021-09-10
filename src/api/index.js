import axios from 'axios';
import {data} from '../constants';

const motilApi = axios.create({
  baseURL: data.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

motilApi.defaults.headers.common['Content-Type'] = `application/json`;
motilApi.defaults.headers.common['Accept'] = `application/json`;

motilApi.interceptors.response.use(
  request => {
    return request;
  },
  error => {
    console.log(error.response, 'INTERCEPTRO');
    throw error.response;
  },
);

export const setToken = token => {
  console.log('token::', token);
  motilApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const deleteToken = () => {
  delete motilApi.defaults.headers.common['Authorization'];
};

export default motilApi;
