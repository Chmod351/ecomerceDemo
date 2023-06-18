import axios from 'axios';

export const BASE_URL = 'https://ecomerce-rest-api-le9i.onrender.com/api';

const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
export const username = currentUser?.username;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Authorization': `Bearer ${TOKEN}` },
});