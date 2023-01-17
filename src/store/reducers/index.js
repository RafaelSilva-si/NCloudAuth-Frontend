import { combineReducers } from 'redux';
import authReducer from '../ducks/auth';
import notificationReducer from '../ducks/notification';
import apiReducer from '../ducks/api';
import usersReducer from '../ducks/users';
import enterpriseReducer from '../ducks/enterprise';
import genericsReducer from '../ducks/generics';
import groupsReducer from '../ducks/groups';
import providerReducer from '../ducks/provider';

const rootReducer = combineReducers({
	auth: authReducer,
	notification: notificationReducer,
	api: apiReducer,
	user: usersReducer,
	enterprise: enterpriseReducer,
	generics: genericsReducer,
	group: groupsReducer,
	provider: providerReducer,
});

export default rootReducer;
