import axios from "axios";

const settings = {

	// baseURL: 'https://llm-kbg2.onrender.com',
	// baseURL: 'https://ultragptpro.vercel.app/api',
	baseURL: 'https://ultragpt-pro.vercel.app/api',
	// baseURL: 'http://localhost:3000/api',
	headers: {
		Accept: 'application/json,text/plain,*/*',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': "*"
	}
}

export const request = axios.create(settings);

request.interceptors.request.use(
	(config) => {
		const token = "0123456789";
		if (token) {
			config.headers.Authorization = `Bearer ${token == null ? "0123456789" : token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);