import * as types from './types';

export const getListProviders = query => {
	return {
		type: types.GET_LIST_PROVIDER,
		query,
	};
};

export const setListProviders = query => {
	return {
		type: types.SET_LIST_PROVIDER,
		query,
	};
};

export const addProvider = provider => {
	return {
		type: types.ADD_PROVIDER,
		provider,
	};
};

export const getProvider = query => {
	return {
		type: types.GET_PROVIDER,
		query,
	};
};

export const setProvider = provider => {
	return {
		type: types.SET_PROVIDER,
		provider,
	};
};

export const editProvider = (provider, id) => {
	return {
		type: types.EDIT_PROVIDER,
		provider,
		id,
	};
};

export const deleteProvider = provider => {
	return {
		type: types.DELETE_PROVIDER,
		provider,
	};
};

export default {
	getListProviders,
	setListProviders,
	addProvider,
	getProvider,
	setProvider,
	editProvider,
	deleteProvider,
};
