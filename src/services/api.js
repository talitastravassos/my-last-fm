import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ws.audioscrobbler.com/2.0',
});

export default api;