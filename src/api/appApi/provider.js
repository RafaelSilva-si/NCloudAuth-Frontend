import api from './api';

export const get = () => api.get('/provider/');

export const getById = id => {
	return api.get(`/provider/${id}`);
};

export const register = query => {
	return api.post(`/provider`, query);
};

export const edit = (query, id) => {
	return api.patch(`/provider/${id}`, query);
};

export const remove = id => {
	return api.delete(`/provider/${id}`);
};
