import api from './api';

export const login = params => api.post('/login', params);

export const allowedModules = () => api.get('/module/allowed');

export const logout = () => api.delete('/token/delete');

export const renew = token =>
	api.put('/token/renew', token, { headers: { Authorization: '' } });
