import axios from 'axios';

const baseURL = 'http://localhost:5173';
const USER_ID = 123;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'x-user-id': USER_ID,
  },
});

export default axiosInstance;
