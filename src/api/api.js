import axios from 'axios';

const api = axios.create({
  baseURL: 'https://engineering-task.elancoapps.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
