import axios from 'axios';

export const apiConfig = {
  url: process.env.REACT_APP_API_ENDPOINT,
};

const apiClient = axios.create({
  baseURL: apiConfig.url,
});

export default apiClient;

export const WALLPAPERS = 'wallpapers/';
