import { call, put, takeLatest } from 'redux-saga/effects';
import * as auth from '../../../api/authApi/auth';
import * as generics from '../../../api/appApi/generics';
import { navigate } from '../../../lib/utils/navigation';
import R from '../../../lib/constants/R';
import { notificationActions } from '../notification';
import { enterpriseActions } from '../enterprise';
import * as actions from './actions';
import { apiActions } from '../api';
import * as types from './types';
import { routes } from '../../../routes/menu';
import routesUrls from '../../../routes/routes';

export function* login(payload) {
	yield put(apiActions.apiStart());

	try {
		const response = yield call(auth.login, {
			...payload.user,
		});

		if (response.data) {
			yield put(actions.setUser(response.data.access_token));
			yield put(actions.setToken(response.data.token));
			localStorage.setItem(
				'user',
				JSON.stringify(response.data.access_token),
			);
			localStorage.setItem(
				'token',
				JSON.stringify(response.data.access_token),
			);
			navigate('/');
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				R.strings.error.invalidLogin,
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export function* logout() {
	try {
		yield put(actions.resetUser());

		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('company');

		navigate('/login');
	} catch (error) {
		yield put(actions.resetUser());

		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('company');

		navigate('/login');
	}
}

export function* checkUser() {
	const storedUser = localStorage.getItem('user');

	if (storedUser) {
		const token = localStorage.getItem('token');
		const company = localStorage.getItem('company');

		yield put(actions.setToken(JSON.parse(token)));
		yield put(enterpriseActions.setSelectCompany(JSON.parse(company)));
		yield put(actions.setUser(JSON.parse(storedUser)));
	} else {
		navigate('/login');
	}
}

export function* allowedModules(payload) {
	const { company } = payload;

	try {
		const response = yield call(auth.allowedModules);

		yield put(actions.setAllowedModules(response.data));

		if (company) {
			const modCompany = response.data.filter(
				item => item.company === company.id,
			);

			const permissionsMenu = [];
			const permissionsRoutes = [];

			modCompany.forEach(mod => {
				routes.forEach(route => {
					if (route.name === mod.name) {
						const aux = [];
						mod.submodules.forEach(sub => {
							route.submodules.forEach(item => {
								if (sub.id === item.id) {
									aux.push(item);
								}
							});
						});
						if (aux.length) {
							permissionsMenu.push({ route, submodules: aux });
						}
					}
				});
				routesUrls.forEach(route => {
					if (route.permission) {
						mod.submodules.forEach(sub => {
							if (sub.id === route.id) {
								permissionsRoutes.push(route);
							}
						});
					}
				});
			});

			routesUrls.forEach(route => {
				if (!route.permission) {
					permissionsRoutes.push(route);
				}
			});

			yield put(
				enterpriseActions.setModulesCompany(
					modCompany,
					permissionsMenu,
					permissionsRoutes,
				),
			);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar módulos do usuário.',
				'error',
			),
		);
	}
}

export default function* watchUserAuthentication() {
	yield takeLatest(types.LOGIN_USER, login);
	yield takeLatest(types.CHECK_USER, checkUser);
	yield takeLatest(types.LOGOUT, logout);
	yield takeLatest(types.GET_ALLOWED_MODULES, allowedModules);
}
