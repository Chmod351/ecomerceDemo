import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_URL;

const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;
export const username = currentUser?.username;

export const publicRequest = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		withCredentials: true,
	},
});
