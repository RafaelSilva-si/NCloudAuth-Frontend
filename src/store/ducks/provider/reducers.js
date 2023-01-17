import * as types from './types';

const initialState = {
	list: false,
	provider: false,
};

const providerReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_LIST_PROVIDER:
			return {
				...state,
				list: action.providers,
			};
		case types.SET_PROVIDER:
			return {
				...state,
				provider: action.provider,
			};
		default:
			return state;
	}
};

export default providerReducer;
