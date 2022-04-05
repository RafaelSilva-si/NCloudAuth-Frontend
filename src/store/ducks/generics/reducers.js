import {
	SET_REPRESENTATIVES_ERP,
	SET_ADDRESS,
	SET_CLIENT,
	SET_CONTACT_FORM,
	SET_CLIENT_LIST,
	SET_CARRIER,
	SET_OPTIONALS_GRID,
	OPEN_SIDEBAR,
	SET_CITY,
	SET_STATE,
	GET_STATE
} from './types';

const initialState = {
	representatives: [],
	address: false,
	client: false,
	contactForm: [],
	clientList: [],
	carrier: [],
	optionalsGrid: [],
	isOpen: false,
	state: [],
	city: []
};

const genericsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CITY:
			return {
				...state,
				city: action.city,
			};
		case GET_STATE:
			return {
				...state,
				city: []
			}
		case SET_STATE:
			return {
				...state,
				state: action.states,
			};
		case SET_REPRESENTATIVES_ERP:
			return {
				...state,
				representatives: action.representatives,
			};
		case SET_ADDRESS:
			return {
				...state,
				address: action.address,
			};
		case SET_CLIENT:
			return {
				...state,
				client: action.client,
			};
		case SET_CONTACT_FORM:
			return {
				...state,
				contactForm: action.contactForm,
			};
		case SET_CLIENT_LIST:
			return {
				...state,
				clientList: action.clientList,
			};
		case SET_CARRIER:
			return {
				...state,
				carrier: action.carrier,
			};
		case SET_OPTIONALS_GRID:
			return {
				...state,
				optionalsGrid: action.optionalsGrid,
			};
		case OPEN_SIDEBAR:
			return {
				...state,
				isOpen: action.data
			}
		default:
			return state;
	}
};

export default genericsReducer;
