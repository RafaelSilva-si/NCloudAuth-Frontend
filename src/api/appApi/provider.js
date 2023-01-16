import api from './api';

export const get = () => api.get('/provider/');

export const getById = id => {
	return api.get(`/provider${id}`);
};

export const register = query => {
	return api.post(`/provider`, query);
};
